import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { countries, phoneRegExp } from "../utils/utils";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LandingModal from "./landingModal";
import Loader from "./loader";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const CreateFreeLink = ({ link = false, isEdit = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userDetails } = useAuthContext()
  const [isModal, setIsModal] = useState(false)
  const [currentLink, setCurrentLink] = useState("");
  const navigate = useNavigate()

  const Schema = yup.object().shape({
    agent: yup.object().shape({
      countryCode: yup.string().required("country code is required"),
      number: yup.string()
        .matches(phoneRegExp, "phone number is not valid")
        .required("number is required!"),
    }),
    message: yup.string()
      .min(1, "message is required!")
      .required("message is required!"),
  });

  const handleSubmit = async (values) => {
    if (formik.errors) {
      formik.validateForm();
    }
    setIsLoading(true);

    try {
      if (isEdit) {
        let body = {
          id: link?._id,
          agents: [values?.agent],
          message: values?.message
        }
        const res = await axios.patch(`${SERVER_URL}api/link/update/free`, { ...body });
        if (res.data) {
          toast.success(res.data?.message)
          setCurrentLink(res.data?.shortLink?.username)
          setIsModal(true)
        }
      } else {
        let body = {
          userId: userDetails?.id,
          agents: [values?.agent],
          message: values?.message
        }
        const res = await axios.post(`${SERVER_URL}api/link/create/free`, { ...body });
        if (res.data) {
          toast.success(res.data?.message)
          setCurrentLink(res.data?.shortLink?.username)
          setIsModal(true)
        }
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

  const formik = useFormik({
    initialValues: {
      agent: {
        countryCode: "+91",
        number: "",
      },
      message: "",
    },
    validationSchema: Schema,
    onSubmit: handleSubmit,
    validateOnChange: false
  });

  const handleCloseModal = () => {
    setIsModal(false);
    navigate("/dashboard")
  }

  const handleGetPremium = () => {
    navigate("/dashboard/plans")
  }

  // set value if edit 
  useEffect(() => {
    if (isEdit && link) {
      formik.setFieldValue('agent.country', link?.agents[0]?.countryCode ?? "")
      formik.setFieldValue('agent.number', link?.agents[0]?.number ?? "")
      formik.setFieldValue('message', link?.message ?? "")
    }
  }, [link])
  return (
    <>
      {isModal && (
        <LandingModal
          handleCloseModal={handleCloseModal}
          handleAuth={handleGetPremium}
          unknownLink={currentLink}
          isPremium={false}
        />
      )}
      {isLoading && <Loader />}
      <Toaster richColors position="top-center" duration={2000} />
      <div className="create-form-container">
        <form method="POST" className="create-form profile-form" onSubmit={formik.handleSubmit}>
          <div className="profile-form-item">
            <label htmlFor="agent-1" className="profile-form-label">
              Agent Number
            </label>
            <div className="create-form-number-block">
              <select
                id="countryCode"
                name={`agent.countryCode`}
                className="profile-form-select"
                value={formik.values.agent.countryCode}
                onChange={formik.handleChange}
              >
                {countries.map((item, index) => {
                  return (
                    <option key={index} value={item?.code}>
                      {item?.code}
                    </option>
                  );
                })}
              </select>
              <div className="input-container">
                <input
                  type="text"
                  id="number"
                  name={`agent.number`}
                  className="profile-form-input"
                  placeholder="agent number..."
                  value={formik.values.agent.number}
                  onChange={formik.handleChange}
                  maxLength={12}
                  minLength={6}
                />
                {formik.errors.agent && (
                  <p className="auth-error">{formik.errors.agent.number}</p>
                )}
              </div>
            </div>
          </div>
          <div className="profile-form-item">
            <label htmlFor="message" className="profile-form-label">
              Message
            </label>
            <div className="input-container">
              <textarea
                type="text"
                id="message"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                className="profile-form-input"
                placeholder="message here..."
                rows={3}
              />
              {formik.errors.message && (
                <p className="auth-error">{formik.errors.message}</p>
              )}
            </div>
          </div>

          <div className="profile-form-item">
            <button type="submit" className="btn-primary create-cta">
              {isEdit === true ? "Update Link" : "Create Link"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateFreeLink;
