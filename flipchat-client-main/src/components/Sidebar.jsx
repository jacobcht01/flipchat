import React from "react";
import LOGO from "../assets/Flipchat-Transperent.png";
import PIE_ICON from "../assets/icon_pie_chart.svg";
import PIE_ICON_WHITE from "../assets/icon_pie_chart_active.svg";
import PLAN_ICON from "../assets/icon_plan.svg";
import PLAN_ICON_WHITE from "../assets/icon_plan_active.svg";
import PROFILE_ICON from "../assets/icon_profile.svg";
import PROFILE_ICON_WHITE from "../assets/icon_profile_active.svg";
import CARD_ICON from "../assets/icon_card.svg";
import CARD_ICON_WHITE from "../assets/icon_card_active.svg";
import HELP_ICON from "../assets/icon_help.svg";
import HELP_ICON_WHITE from "../assets/icon_help_active.svg";
import LOGOUT_ICON from "../assets/icon_logout.svg";
import { useSidebarContext } from "../context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const NAV_LINKS = [
  {
    id: 1,
    name: "My Links",
    image: PIE_ICON,
    imageWhite: PIE_ICON_WHITE,
    link: "/dashboard",
    children: ["/dashboard/create", "/dashboard/link"],
  },
  {
    id: 2,
    name: "Plans",
    image: PLAN_ICON,
    imageWhite: PLAN_ICON_WHITE,
    link: "/dashboard/plans",
    children: [],
  },
  {
    id: 3,
    name: "My Profile",
    image: PROFILE_ICON,
    imageWhite: PROFILE_ICON_WHITE,
    link: "/dashboard/profile",
    children: [],
  },
  {
    id: 4,
    name: "Billing",
    image: CARD_ICON,
    imageWhite: CARD_ICON_WHITE,
    link: "/dashboard/billing",
    children: [],
  },
  {
    id: 5,
    name: "Help",
    image: HELP_ICON,
    imageWhite: HELP_ICON_WHITE,
    link: "/dashboard/help",
    children: [],
  },
];

const Sidebar = () => {
  const { currentTab, handleChangeTab } = useSidebarContext();
  const { handleLogout: logoutUser } = useAuthContext();

  const handleClickTab = (tab) => {
    handleChangeTab(tab);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    // need to be added logout api
    logoutUser()
    navigate("/register");
  };

  const handleOnClickLogo = () => {
    navigate("/dashboard")
  }
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={LOGO} alt="flipchat logo" className="sidebar-header-logo" onClick={handleOnClickLogo}/>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-nav">
          {NAV_LINKS?.map((item) => {
            const selected = item.link === currentTab || item.children.some(item => currentTab?.includes(item))
            return (
              <div
                key={item.id}
                className={`sidebar-nav-item ${
                  selected ? "active" : ""
                }`}
                onClick={() => handleClickTab(item.link)}
              >
                <img
                  src={
                    selected ? item?.imageWhite : item?.image
                  }
                  alt="pie icon"
                  className="sidebar-nav-item-logo"
                />
                <p className="sidebar-nav-item-text">{item?.name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sidebar-footer" onClick={handleLogout}>
        <img
          src={LOGOUT_ICON}
          alt="logout icon"
          className="sidebar-footer-icon"
        />
        <p className="sidebar-footer-text">Sign Out</p>
      </div>
    </div>
  );
};

export default Sidebar;
