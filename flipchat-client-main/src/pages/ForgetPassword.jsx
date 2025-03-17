import { useState } from "react";
import Logo from "../assets/Flipchat-Transperent.png";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import ChangePassword from "../components/modal/changePassword"
import { toast, Toaster } from "sonner";
import Loader from "../components/loader";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false)

  // form shcema
  const formScehma = yup.object().shape({
    email: yup.string().email().required("email is required"),
  });

  // handle submit form
  const handleSubmit = async (values) => {
    if(formik.errors){
      formik.validateForm()
    }
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${SERVER_URL}api/auth/forget`,
        { ...values },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if(res.data){
        toast.success(res.data?.message)
        setIsModal(true)
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
      email: ""
    },
    validationSchema: formScehma,
    onSubmit: handleSubmit,
    validateOnChange: false
  });

  return (
    <>
      {isLoading && <Loader />}
      {isModal && <ChangePassword email={formik.values.email}/>}
      <Toaster richColors duration={2000} position="top-center"/>
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
                <h3 className="auth-logo-text">Forget Password</h3>
              </div>
              <h3 className="auth-title">
                You will receive an email regarding the password change
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
                  required
                />
                {formik.errors.email && (
                  <p className="auth-error">{formik.errors.email}</p>
                )}
              </div>
              <button type="submit" className="auth-form-cta btn-primary">
                Submit
              </button>
              <p className="auth-footer-text">
                Don't have an account ?{" "}
                <Link className="auth-forget" to="/register">
                  Register Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
