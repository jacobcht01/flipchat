import { ResponsiveBar } from "@nivo/bar";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { getDayBreakUps, getLast12Months, SERVER_URL } from "../../utils/utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "sonner";
import dayjs from "dayjs";
import Spinner from "../spinner";
import Icon_Refresh from "../../assets/icon_refresh.svg";

const Analytics = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState("date");
  const [last12months, setLast12Months] = useState();
  const [selectedMonth, setSelectedMonth] = useState();
  const [analyticsData, setAnalyticsData] = useState([
    { date: new Date("02/02/2025"), clicks: 10 },
  ]);
  const [LinkAnalytics, setLinkAnalytics] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [totalClicks, setTotalClicks] = useState(0);
  const [countriesData, setCountriesData] = useState([]);
  const [sourceData, setSourceData] = useState([]);
  const [osData, setOsData] = useState([]);

  // fetch day analytics by id
  const fetchDayAnalyticsById = async (id, selectedDate) => {
    setIsLoading(true);
    try {
      let body = {
        id: id,
        date: dayjs(selectedDate),
      };
      const res = await axios.post(`${SERVER_URL}api/analytics/date`, {
        ...body,
      });
      if (res.data) {
        console.log(res.data);
        setLinkAnalytics(res.data?.data);
        setTotalClicks(res.data?.data?.clicks)
        filterDayData(res.data?.data?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // fetch month analytics by id
  const fetchMonthAnalyticsById = async (id, selectedMonth) => {
    setIsLoading(true);
    try {
      let body = {
        id: id,
        month: selectedMonth,
      };
      const res = await axios.post(`${SERVER_URL}api/analytics/month`, {
        ...body,
      });
      if (res.data) {
        console.log(res.data);
        setLinkAnalytics(res.data?.data);
        filterMonthlyData(res.data?.data);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // filter chart data
  const filterDayData = (value) => {
    setIsFetching(true);
    const data = value ?? [];
    const dayBreaksUps = getDayBreakUps();

    const hourlyData = dayBreaksUps.map((item) => ({ ...item }));
    let countryClicks = {};
    let osClicks = {};
    let sourceClicks = {};

    if (data?.length) {
      data?.forEach((item) => {
        const createdAt = new Date(item?.createdAt);
        const hour = createdAt.getHours();
        const minutes = createdAt.getMinutes();

        let hourIndex = hour;
        if (minutes > 0) {
          hourIndex = hour % 24;
        } else {
          hourIndex = (hour + 1) % 24;
        }

        hourlyData[hourIndex].clicks += 1;

        // set country 
        const country = item?.country;
        if (country) {
          if (!countryClicks[country]) {
            countryClicks[country] = 0;
          }
          countryClicks[country] += 1;
        }

        // set os
        const os = item?.operatingSystem;
        if (os) {
          if (!osClicks[os]) {
            osClicks[os] = 0;
          }
          osClicks[os] += 1;
        }

        // set source 
        const source = item?.source;
        if (source) {
          if (!sourceClicks[source]) {
            sourceClicks[source] = 0;
          }
          sourceClicks[source] += 1;
        }
      });

      const countryData = Object.keys(countryClicks).map((country) => ({
        country,
        clicks: countryClicks[country],
      }));

      const osData = Object.keys(osClicks).map((os) => ({
        os,
        clicks: osClicks[os]
      }))

      const sourceData = Object.keys(sourceClicks).map((source) => ({
        source,
        clicks: sourceClicks[source]
      }))
      console.log(countryData, osData, sourceData)
      setCountriesData(countryData)
      setOsData(osData)
      setSourceData(sourceData)
      setAnalyticsData(hourlyData);
    } else {
      setAnalyticsData(hourlyData);
    }

    setIsFetching(false);
  };

  // filter monthly data
  const filterMonthlyData = (value) => {
    setIsFetching(true);
    const links = value ?? [];

    let data = [];
    let clicks = 0;

    let countryClicks = {};
    let osClicks = {};
    let sourceClicks = {};

    // handle here
    links?.forEach((item) => {
      const innerData = item?.data;
      clicks += item?.clicks
      data = [...data, ...innerData];
    });

    setTotalClicks(clicks)

    const currentMonth = dayjs(selectedMonth);

    // Get the start and end of the month
    const monthStartDate = currentMonth.startOf("month");
    const monthEndDate = currentMonth.endOf("month");

    // Create an array of all dates in the selected month
    const allDatesInMonth = [];
    let currentDate = monthStartDate;

    while (
      currentDate.isBefore(monthEndDate, "day") ||
      currentDate.isSame(monthEndDate, "day")
    ) {
      allDatesInMonth.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day");
    }

    const monthlyData = allDatesInMonth?.map((item) => {
      const date = dayjs(item).format("DD-MM-YYYY");

      return {
        date,
        clicks: 0,
      };
    });

    if (data?.length) {
      data?.forEach((item) => {
        const createdAt = new Date(item?.createdAt);
        const formattedCreatedAt = dayjs(createdAt).format("DD-MM-YYYY");

        const monthIndex = monthlyData?.findIndex(
          (item) => item?.date === formattedCreatedAt
        );

        // If we found the correct date, increment the clicks
        if (monthIndex !== -1) {
          monthlyData[monthIndex].clicks += 1;
        }

        // set country 
        const country = item?.country;
        if (country) {
          if (!countryClicks[country]) {
            countryClicks[country] = 0;
          }
          countryClicks[country] += 1;
        }

        // set os
        const os = item?.operatingSystem;
        if (os) {
          if (!osClicks[os]) {
            osClicks[os] = 0;
          }
          osClicks[os] += 1;
        }

        // set source 
        const source = item?.source;
        if (source) {
          if (!sourceClicks[source]) {
            sourceClicks[source] = 0;
          }
          sourceClicks[source] += 1;
        }
      });
      const countryData = Object.keys(countryClicks).map((country) => ({
        country,
        clicks: countryClicks[country],
      }));

      const osData = Object.keys(osClicks).map((os) => ({
        os,
        clicks: osClicks[os]
      }))

      const sourceData = Object.keys(sourceClicks).map((source) => ({
        source,
        clicks: sourceClicks[source]
      }))
      console.log(countryData, osData, sourceData)
      setCountriesData(countryData)
      setOsData(osData)
      setSourceData(sourceData)
      setAnalyticsData(monthlyData);
    } else {
      setAnalyticsData(monthlyData);
    }

    setIsFetching(false);
  };

  // handle change date
  const handleChangeDate = (value) => {
    setSelectedDate(new Date(value));
    fetchDayAnalyticsById(id, new Date(value));
  };

  // handle change month
  const handleChangeMonth = (value) => {
    setSelectedMonth(value);
    fetchMonthAnalyticsById(id, value);
  };

  // handle change day & month
  const handleChangeDayMonth = (value) => {
    if (value === "day") {
      setSelectedType(value);
      fetchDayAnalyticsById(id, selectedDate);
    } else if (value === "month") {
      setSelectedType(value);
      fetchMonthAnalyticsById(id, selectedMonth);
    }
  };

  // handle refresh data
  const handleRefreshData = () => {
    if(selectedType === "day"){
      // refresh day data
      fetchDayAnalyticsById(id, selectedDate)
    } else {
      // refresh month data
      fetchMonthAnalyticsById(id, selectedMonth)
    }
  }

  useEffect(() => {
    setSelectedType("day");
    const res = getLast12Months();
    if (res && res.length) {
      setLast12Months(res);
      setSelectedMonth(res[res.length - 1]);
    }
  }, []);

  useEffect(() => {
    if (id && LinkAnalytics === null) {
      fetchDayAnalyticsById(id, selectedDate);
    }
  }, []);

  return (
    <>
      <Toaster richColors position="top-center" duration={2000} />
      <div className="analytics-chart">
        <div className="analytics-chart-title-container">
          <h3 className="analytics-chart-title">Link Analytics</h3>
          <img src={Icon_Refresh} alt="refresh icon" className="analytics-refresh-icon" onClick={handleRefreshData}/>
          {(isLoading || isFetching) && <Spinner />}
        </div>
        <div className="analytics-date-selector">
          <div className="radio-group">
            <input
              type="radio"
              id="day"
              name="radio-selector"
              className="radio-group-input"
              checked={selectedType === "day"}
              onChange={(e) => handleChangeDayMonth("day")}
            />
            <label htmlFor="day" className="radio-group-text">
              Day
            </label>
          </div>
          <div className="radio-group">
            <input
              type="radio"
              id="month"
              name="radio-selector"
              className="radio-group-input"
              checked={selectedType === "month"}
              onChange={(e) => handleChangeDayMonth("month")}
            />
            <label htmlFor="month" className="radio-group-text">
              Month
            </label>
          </div>
          <div className="date-selector">
            <div className="date-selector-wrapper">
              {selectedType === "day" && (
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => handleChangeDate(date)}
                  className={""}
                  clearIcon={null}
                />
              )}

              {selectedType === "month" && (
                <div className="month-selector">
                  <select
                    name="month"
                    id="month"
                    className="month-selector-input"
                    value={selectedMonth}
                    onChange={(e) => handleChangeMonth(e.target.value)}
                  >
                    {last12months?.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="analytics-table-container">
          <div className="analytics-clicks-block">
            <h3 className="analytics-clicks-title">Total Clicks</h3>
            <h3 className="analytics-clicks-value">{totalClicks ?? 0}</h3>
          </div>

          {/* Country Table */}
          <div className="analytics-table">
            <div className="analytics-table-header">
              <p className="analytics-table-header-title">Country</p>
              <p className="analytics-table-header-title">Clicks</p>
            </div>
            <div className="analytics-table-body">

              {countriesData?.length === 0 && <p className="analytics-table-body-text">No data to show</p>}
              {countriesData?.map(item => {
                return (
                  <div className="analytics-table-row">
                    <p className="analytics-table-body-text">{item?.country}</p>
                    <p className="analytics-table-body-text">{item?.clicks}</p>
                  </div>
                )
              })}

            </div>
          </div>
          {/* OS Table */}
          <div className="analytics-table">
            <div className="analytics-table-header">
              <p className="analytics-table-header-title">OS</p>
              <p className="analytics-table-header-title">Clicks</p>
            </div>
            <div className="analytics-table-body">

              {osData?.length === 0 && <p className="analytics-table-body-text">No data to show</p>}
              {osData?.map(item => {
                return (
                  <div className="analytics-table-row">
                    <p className="analytics-table-body-text">{item?.os}</p>
                    <p className="analytics-table-body-text">{item?.clicks}</p>
                  </div>
                )
              })}

            </div>
          </div>
          {/* Source Table */}
          <div className="analytics-table">
            <div className="analytics-table-header">
              <p className="analytics-table-header-title">Source</p>
              <p className="analytics-table-header-title">Clicks</p>
            </div>
            <div className="analytics-table-body">

              {sourceData?.length === 0 && <p className="analytics-table-body-text">No data to show</p>}
              {sourceData?.map(item => {
                return (
                  <div className="analytics-table-row">
                    <p className="analytics-table-body-text">{item?.source}</p>
                    <p className="analytics-table-body-text">{item?.clicks}</p>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
        <div className="analytics-chart-block">
          <ResponsiveBar
            data={analyticsData}
            keys={["clicks"]}
            indexBy="date"
            margin={{ top: 30, right: 10, bottom: 80, left: 30 }}
            padding={0.3}
            borderColor={"#ccc"}
            colors="#00b66c"
            colorBy="index"
            axisLeft={{
              tickValues: 2,
            }}
            axisBottom={{
              tickValues: 2,
              tickRotation: 45,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Analytics;
