import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuthContext } from "../context/AuthContext";
import { getUserByid } from "../utils/apis";
import { toast, Toaster } from "sonner";
import Loader from "../components/loader";

const DashboardLayout = () => {

  const { currentUser, setUserDetails, handleLogout } = useAuthContext()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const fetchUserDetails = async (id) => {
    setIsLoading(true)
    try {
      const res = await getUserByid(id);
      if (res.data) {
        setUserDetails(res.data?.user)
      }

    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("something went wrong");
      }
      setTimeout(() => {
        handleLogout()
        navigate("/login")
      }, 1000)
    } finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {
    if (currentUser) {
      fetchUserDetails(currentUser?.id)
    } else {
      navigate("/")
    }
  }, [currentUser])


  return (
    <div className="dashboard-layout">
      {isLoading && <Loader />}
      <Toaster richColors duration={2000} position="top-center" />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
