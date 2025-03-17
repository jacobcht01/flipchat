import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SidebarContext = createContext(null);

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};

const SidebarContextProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("/dashboard");
  const location = useLocation();
  const navigate = useNavigate()

  const path = location.pathname;

  // handle change sidebar tab
  const handleChangeTab = (tab) => {
    navigate(tab)
    setCurrentTab(tab);
  };

  let items = {
    currentTab,
    handleChangeTab,
  };

  // handle sidebar state on page reload 
  useEffect(() => {
    if (path) {
      handleChangeTab(path);
    }
  }, [path]);

  return (
    <SidebarContext.Provider value={items}>{children}</SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
