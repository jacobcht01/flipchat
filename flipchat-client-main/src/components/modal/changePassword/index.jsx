import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast, Toaster } from "sonner";
import Loader from "../../loader";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const ChangePassword = ({ email }) => {
  const [otp, setotp] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    password: yup.string().required("password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleChangePassword = async (values) => {
    if (formik.errors) {
      formik.validateForm();
    }
    let body = {
      otp: otp,
      password: values?.password,
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${SERVER_URL}api/auth/forget/verify`,
        { ...body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data) {
        toast.success(res.data?.message);
        setTimeout(() => {
          navigate("/login");
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

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: formSchema,
    onSubmit: handleChangePassword,
    validateOnChange: false,
  });

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.get(`${SERVER_URL}api/otp/verify/${otp}`);

      if (res.data) {
        toast.success(res.data?.message);
        setIsOtpVerified(true);
        setTimer(0)
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

  const handleWarn = () => {
    toast.warning("otp is already verified");
  };

  const handleSendAgain = async () => {
    setIsLoading(true);

    let body = {
      email: email,
    };

    try {
      const res = await axios.post(
        `${SERVER_URL}api/otp/forget/resend`,
        { ...body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        toast.success(res.data?.message);
        setTimer(30); // Set the OTP timer to 30 seconds
        setIsButtonDisabled(true); // Disable the button until the timer is done
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

  // Timer logic - count down every second
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1); // Decrease the timer by 1 each second
      }, 1000);
    } else {
      // When the timer reaches 0, re-enable the button
      setIsButtonDisabled(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [timer]);
  return (
    <>
      {isLoading && <Loader />}
      <Toaster richColors duration={2000} position="top-center" />
      <div className="modal">
        <div className="modal-container">
          <div className="modal-body">
            <h3 className="modal-title">Change Password</h3>
            <p className="modal-para">
              A 6 digit verification code has been sent to your email
            </p>
            <form
              method="POST"
              className="modal-form"
              onSubmit={handleVerifyOtp}
            >
              <div className="form-item form-item-flex">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  className="form-input form-item-input-flex"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  disabled={isOtpVerified}
                  required
                />
                <button
                  type="submit"
                  disabled={isOtpVerified}
                  className={`auth-form-cta-flex btn-primary ${
                    isOtpVerified ? "btn-disabled" : ""
                  }`}
                >
                  Verify
                </button>
              </div>
              <p className="auth-footer-text">
                Didn't receive otp ?{" "}
                {isButtonDisabled ? (
                  <Link className="auth-forget">Resend after {timer}s</Link>
                ) : (
                  <Link
                    className="auth-forget"
                    onClick={isOtpVerified ? handleWarn : handleSendAgain}
                  >
                    Send Again
                  </Link>
                )}
              </p>
            </form>

            <form
              method="POST"
              className="modal-form change-password-form"
              onSubmit={formik.handleSubmit}
            >
              <div className="form-item">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  className="form-input form-item-input-flex"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  disabled={!isOtpVerified}
                  required
                />
                {formik.errors.password && (
                  <p className="auth-error">{formik.errors.password}</p>
                )}
              </div>
              <div className="form-item">
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm Password"
                  placeholder="Enter password again"
                  className="form-input form-item-input-flex"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  disabled={!isOtpVerified}
                  required
                />
                {formik.errors.confirmPassword && (
                  <p className="auth-error">{formik.errors.confirmPassword}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={!isOtpVerified}
                className={`auth-form-cta btn-primary ${
                  !isOtpVerified ? "btn-disabled" : ""
                }`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
