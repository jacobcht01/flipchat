import React, { useEffect, useState } from "react";
import { countries, phoneRegExp, SERVER_URL } from "../utils/utils";
import * as yup from "yup";
import { useFormik } from "formik";
import Warning from "../components/common/Warning";
import UpdatePasswordModal from "../components/modal/updatePassword";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import Loader from "../components/loader";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails, fetchUserDetails } = useAuthContext();

  // handle submit
  const handleSubmit = async (values) => {
    if (formik.errors) {
      formik.validateForm();
    }

    setIsLoading(true)

    let body = {
      id: userDetails?.id,
      name: values?.name,
      phone: values?.phone,
      country: values?.country,
      accountType: values?.accountType,
      industry: values?.industry
    }

    try {
      const res = await axios.patch(`${SERVER_URL}api/user/update`, { ...body })
      if (res.data) {
        toast.success(res.data?.message)
        handleRefetchUser(userDetails?.id)
      }
    } catch (error) {
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
  };

  const Schema = yup.object().shape({
    name: yup.string().max(12).required("name is required"),
    phone: yup.object().shape({
      countryCode: yup.string().required("country code is required"),
      number: yup
        .string()
        .matches(phoneRegExp, "phone number is not valid")
        .required("number is required!"),
    }),
    country: yup.string().required("country is required"),
    accountType: yup.string().required("accountType is required"),
    industry: yup.string().required("industry is required"),
  });

  const formik = useFormik({
    validationSchema: Schema,
    initialValues: {
      name: "",
      phone: {
        countryCode: "+91",
        number: "",
      },
      country: "India",
      accountType: "",
      industry: "",
    },
    onSubmit: handleSubmit,
    validateOnChange: false,
  });



  // handle edit
  const handleEdit = () => {
    setIsEdit(true);
  };

  // handle close edit
  const handleCancelEdit = () => {
    setIsEdit(false);
    // fetch user details and set the state here
  };

  // handle open password modal 
  const handleOpenPassModal = () => {
    setPasswordModal(true);
  }

  // handle close password modal 
  const handleClosePassModal = () => {
    setPasswordModal(false)
  }

  // handle set user details 
  const handleSetUserDetails = (userDetails) => {
    formik.setFieldValue('name', userDetails?.name ?? "")
    formik.setFieldValue('phone', userDetails?.phone ?? {
      countryCode: "+91",
      number: "",
    })
    formik.setFieldValue('country', userDetails?.country ?? "")
    formik.setFieldValue('accountType', userDetails?.accountType ?? "")
    formik.setFieldValue('industry', userDetails?.industry ?? "")
  }

  // handle refetch user 
  const handleRefetchUser = async (id) => {
    setIsLoading(true)

    try {
      const user = await fetchUserDetails(id)
      if (user) {
        handleSetUserDetails(user)
      }
    } catch (error) {
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

  // load initial values 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("flipchat_user"));
    if (user) {
      handleRefetchUser(user?.id)
    }
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {passwordModal && <UpdatePasswordModal handleClosePassModal={handleClosePassModal} />}
      <Toaster richColors position="top-center" duration={2000} />
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header-title">
            <h3 className="dashboard-header-title-normal">Dashboard</h3>
            <div className="dashboard-header-title-divider"></div>
            <h3 className="dashboard-header-title-main">My Profile</h3>
          </div>
        </div>
        <div className="dashboard-main">
          <div className="profile-container">
            {(
              <div className="profile-warning-container">
                <Warning
                  text={
                    isEdit ? "Fields are editable. You can now update the details."
                      :
                      "Fields are read only. Click on 'Edit Details' to update the fields."
                  }
                />
              </div>
            )}
            <form
              method="POST"
              className="profile-form"
              onSubmit={formik.handleSubmit}
            >
              <div className="profile-form-item">
                <label htmlFor="name" className="profile-form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="profile-form-input"
                  placeholder="fullname..."
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  disabled={!isEdit}
                />
                {formik.errors.name && (
                  <p className="auth-error">{formik.errors.name}</p>
                )}
              </div>
              <div className="profile-form-item">
                <label htmlFor="agent-1" className="profile-form-label">
                  Number
                </label>
                <div className="create-form-number-block">
                  <select
                    id="countryCode"
                    name={`phone.countryCode`}
                    className="profile-form-select"
                    value={formik.values.phone.countryCode}
                    onChange={formik.handleChange}
                    disabled={!isEdit}
                  >
                    <option value="+91">+91</option>
                    <option value="+92">+92</option>
                    <option value="+1">+1</option>
                  </select>
                  <div className="input-container">
                    <input
                      type="text"
                      id="number"
                      name={`phone.number`}
                      className="profile-form-input"
                      placeholder="agent number..."
                      value={formik.values.phone.number}
                      onChange={formik.handleChange}
                      maxLength={12}
                      minLength={6}
                      disabled={!isEdit}
                    />
                    {formik.errors.agent && (
                      <p className="auth-error">{formik.errors.agent.number}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile-form-item">
                <label htmlFor="account-type" className="profile-form-label">
                  Account Type
                </label>
                <select
                  name="accountType"
                  id="account-type"
                  className="profile-form-input"
                  value={formik.values.accountType}
                  onChange={formik.handleChange}
                  disabled={!isEdit}
                >
                  <option value={"individual"}>Individual</option>
                  <option value={"business"}>Business</option>
                </select>
                {formik.errors.accountType && (
                  <p className="auth-error">{formik.errors.accountType}</p>
                )}
              </div>
              <div className="profile-form-item">
                <label htmlFor="country" className="profile-form-label">
                  Country
                </label>
                <select
                  name="country"
                  id="country"
                  className="profile-form-input"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  disabled={!isEdit}
                >
                  {countries?.map((item, index) => {
                    return (
                      <option key={index + 1} value={item.country}>
                        {item.country}
                      </option>
                    );
                  })}
                </select>
                {formik.errors.country && (
                  <p className="auth-error">{formik.errors.country}</p>
                )}
              </div>
              <div className="profile-form-item">
                <label htmlFor="industry" className="profile-form-label">
                  Sector/Industry
                </label>
                <select
                  name="industry"
                  id="industry"
                  className="profile-form-input"
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  disabled={!isEdit}
                >
                  <option value={"education"}>Education</option>
                  <option value={"marketing"}>Marketing</option>
                </select>
                {formik.errors.industry && (
                  <p className="auth-error">{formik.errors.industry}</p>
                )}
              </div>

              {isEdit ? (
                <div className="profile-form-item">
                  <button
                    type="button"
                    className="btn-secondary profile-cta-edit"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary profile-cta-edit"
                  >
                    Save Details
                  </button>
                </div>
              ) : (
                <div className="profile-form-item">
                  <button
                    type="button"
                    className="btn-secondary profile-cta-edit"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="btn-primary profile-cta-edit"
                    onClick={handleOpenPassModal}
                  >
                    Change Password
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
