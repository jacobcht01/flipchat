import React, { useState } from "react";
import Logo from "../assets/Flipchat-Transperent.png";
import GoogleIcon from "../assets/icon_google.svg";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { toast, Toaster } from "sonner";
import Loader from "../components/loader";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleSetUser } = useAuthContext();

  // form schema
  const formScehma = yup.object().shape({
    email: yup.string().required("email is required"),
    password: yup.string().required("password is required"),
  });

  // handle submit form
  const handleSubmit = async (values) => {
    if (formik.errors) {
      formik.validateForm();
    }
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${SERVER_URL}api/auth/login`,
        { ...values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        toast.success(res.data?.message);
        setTimeout(() => {
          handleSetUser(res.data?.user);
          navigate("/dashboard");
        }, 1000);
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

  // initialize formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: formScehma,
    onSubmit: handleSubmit,
    validateOnChange: false,
  });

  // handle google success
  const handleGoogleSuccess = async (data) => {
    const { code } = data;

    setIsLoading(true);

    let body = {
      code,
    };

    try {
      const res = await axios.post(
        `${SERVER_URL}api/auth/google/login`,
        { ...body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        toast.success(res.data?.message);
        setTimeout(() => {
          handleSetUser(res.data?.user);
          navigate("/dashboard");
        }, 1000);
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

  const handleGoogleSignUp = useGoogleLogin({
    onSuccess: (data) => handleGoogleSuccess(data),
    onError: () => toast.error("unable to login via google"),
    flow: "auth-code",
  });
  return (
    <>
      {isLoading && <Loader />}
      <Toaster richColors duration={2000} position="top-center" />
      <div className="auth">
        <div className="auth-container">
          <form
            className="auth-form"
            onSubmit={formik.handleSubmit}
            method="POST"
          >
            <div className="auth-form-header">
              <div className="auth-logo-container">
                <img src={Logo} alt="flichat logo" className="auth-logo" />
                <div className="auth-logo-divider"></div>
                <h3 className="auth-logo-text">Login</h3>
              </div>
              <h3 className="auth-title">
                New to flipchat ?{" "}
                <Link to="/register" className="auth-redirect">
                  Register Here
                </Link>
              </h3>
            </div>
            <div className="auth-form-body">
              <div className="form-item">
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && (
                  <p className="auth-error">{formik.errors.email}</p>
                )}
              </div>
              <div className="form-item">
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && (
                  <p className="auth-error">{formik.errors.password}</p>
                )}
              </div>
              <button type="submit" className="auth-form-cta btn-primary">
                Login
              </button>
              <p className="auth-footer-text">
                Unable to login ?{" "}
                <Link className="auth-forget" to="/forget/password">
                  Forget password
                </Link>
              </p>
            </div>

            <div className="auth-google-block">
              <p className="auth-form-seperator">or</p>
              <div className="auth-google-btn" onClick={handleGoogleSignUp}>
                <img src={GoogleIcon} className="auth-google-btn-icon" />
                <p className="auth-google-btn-text">Sign in with google</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
