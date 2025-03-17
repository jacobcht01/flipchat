import React, { useEffect, useState } from "react";
import SearchIcon from "../assets/search-icon.svg";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import Warning from "../components/common/Warning";
import Loader from "../components/loader";
import { PLANS } from "../utils/utils";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allLinks, setAllLinks] = useState([]);
  const [sortedLinks, setSortedLinks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { userDetails } = useAuthContext();

  // get all links
  const getAllLinks = async (id) => {
    setIsLoading(true);

    try {
      const res = await axios.get(`${SERVER_URL}api/link/${id}`);
      if (res.data) {
        setAllLinks(res.data?.links);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    navigate("create");
  };

  // handle navigate link
  const handleNavigateLink = (id) => {
    navigate(`link/${id}`)
  }

  // handle rearrange links 
  const handleRearrangeLinks = () => {
    const freeLinks = allLinks.filter(link => link?.linkType === PLANS.FREE);
    const premiumlinks = allLinks.filter(link => link?.linkType !== PLANS.FREE);

    const sortedLinks = [...premiumlinks, ...freeLinks]
    setSortedLinks(sortedLinks)
  }


  // rearrange links 
  useEffect(() => {
    if (allLinks.length) {
      handleRearrangeLinks()
    }
  }, [allLinks])


  // search text 
  useEffect(() => {

    if (searchText !== "") {
      const filtered = allLinks.filter(link => {
        return link?.username?.includes(searchText)
      })
      setSortedLinks(filtered)
    } else {
      handleRearrangeLinks()
    }


  }, [searchText])


  useEffect(() => {
    if (userDetails?.id) {
      getAllLinks(userDetails?.id);
    }
  }, [userDetails]);
  return (
    <>
      {isLoading && <Loader />}
      <Toaster richColors position="top-center" duration={2000} />
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header-title">
            <h3 className="dashboard-header-title-normal">Dashboard</h3>
            <div className="dashboard-header-title-divider"></div>
            <h3 className="dashboard-header-title-main">My Links</h3>
          </div>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-main-header">
            <div className="dashboard-search-item">
              <input
                type="text"
                className="dashboard-search-input"
                name="search"
                placeholder="Search Here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <img src={SearchIcon} alt="search icon" className="search-icon" />
            </div>
            <button
              className="dashboard-main-header-cta btn-primary"
              onClick={handleCreate}
            >
              Create New
            </button>
          </div>
          <div className="dashboard-main-content">
            {!allLinks?.length && (
              <Warning
                text={"You don't have any links present."}
                linkText={"Create One Now"}
                link={"/dashboard/create"}
              />
            )}
            <div className="dashboard-grid">
              {sortedLinks?.map((item) => {
                return (
                  <div key={item?._id} className="dashboard-grid-item"
                    onClick={() => handleNavigateLink(item?._id)}
                  >
                    <h3 className="dashboard-grid-item-link">
                      flipchat.link/{item?.username}
                    </h3>
                    <p className="dashboard-grid-item-message">
                      "{item?.message}"
                    </p>
                    <div
                      className={`dashboard-grid-item-tag plan-${item?.linkType?.toLowerCase() ?? ""
                        }`}
                    >
                      <p className="plan-tag">{item?.linkType}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
