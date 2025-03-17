import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import dayjs from "dayjs";
import ResponsivePagination from 'react-responsive-pagination';
import Loader from "../components/loader";
import Warning from "../components/common/Warning";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const Billing = () => {

  const [transactions, setTransactions] = useState([]);
  const [paginatedRecord, setPaginatedRecord] = useState([])
  const { userDetails } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [dataWarning, setDataWarning] = useState(false);
  const recordLimit = 8;


  // handle fetch transactions 
  const handleFetchTransactions = async () => {
    setIsLoading(true)
    setDataWarning(false)

    try {
      const res = await axios.get(`${SERVER_URL}api/transaction/records/${userDetails?.id}`)

      if (res.data) {
        setTransactions(res.data?.transactions)
        const totalPages = Math.ceil(res?.data?.totalCount / 8)
        setTotalRecords(totalPages)
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
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (transactions && transactions.length && currentPage) {
      const start = currentPage === 1 ? 0 : recordLimit * (currentPage - 1);
      const end = currentPage * recordLimit;

      const slicedRecords = transactions.slice(start, end);
      setPaginatedRecord(slicedRecords)
    } else if (!transactions.length) {
      setDataWarning(true)
    }
  }, [transactions, currentPage])



  useEffect(() => {
    if (userDetails) {
      handleFetchTransactions()
    }
  }, [userDetails])

  return (
    <>
      {isLoading && <Loader />}
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header-title">
            <h3 className="dashboard-header-title-normal">Dashboard</h3>
            <div className="dashboard-header-title-divider"></div>
            <h3 className="dashboard-header-title-main">Billing</h3>
          </div>
        </div>
        <div className="dashboard-main">
          <div className="billing-container">
            {dataWarning &&
              <div className="profile-warning-container">
                <Warning
                  text={
                    "You haven't made any transactions yet. Once you do, they'll appear here."
                  }
                />
              </div>
            }
            <table className="billing-table">
              <thead className="billing-table-head">
                <tr>
                  <th className="billing-table-th">Transaction Id</th>
                  <th className="billing-table-th">Date</th>
                  <th className="billing-table-th">Amount</th>
                  <th className="billing-table-th">Plan Type</th>
                  <th className="billing-table-th">Status</th>
                </tr>
              </thead>
              <tbody className="billing-table-body">
                {paginatedRecord?.map((item) => {
                  const formattedDate = dayjs(item?.createdAt).format("YYYY/MM/DD")
                  return (
                    <tr key={item?._id} className="billing-table-row">
                      <td className="billing-table-data">#{item?._id}</td>
                      <td className="billing-table-data">{formattedDate}</td>
                      <td className="billing-table-data">RS {item?.amount}</td>
                      <td className="billing-table-data">{item?.planType}</td>
                      <td className="billing-table-data">
                        <div
                          className={`billing-status-tag billing-${item?.status?.toLowerCase() ?? ""
                            }`}
                        >
                          <p className="billing-status">{item?.status}</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="pagination-block">
              <ResponsivePagination
                current={currentPage}
                total={totalRecords}
                onPageChange={setCurrentPage}
              />
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default Billing;
