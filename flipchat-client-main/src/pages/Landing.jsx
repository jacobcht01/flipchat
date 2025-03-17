import React, { useState } from "react";
import LOGO from "../assets/Flipchat-Transperent.png";
import HamburgerIcon from "../assets/icon_hamburger.svg";
import { Link, useNavigate } from "react-router-dom";
import ShowcaseBG from "../assets/showcase-bg.png";
import SearchIcon from "../assets/search.svg";
import CheckIcon from "../assets/check.svg";
import MailIcon from "../assets/inbox.svg";
import Instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";
import CrossIcon from "../assets/cross.svg";
import AgentAnimation from "../components/animation/Animation";
import Device from "../components/device/Device";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { countries, phoneRegExp } from "../utils/utils";
import LandingModal from "../components/landingModal";
import Spinner from "../components/spinner"

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const Landing = () => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState(false);
  const [unknownLink, setUnknownLink] = useState("");
  const [notBrand, setNotBrand] = useState(false);
  const [isBrand, setIsBrand] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [isFetching, setIsFetching] = useState(false)
  const [isMenuMobile, setIsMenuMobile] = useState(false)

  const Schema = yup.object().shape({
    agent: yup.object().shape({
      countryCode: yup.string().required("country code is required"),
      number: yup.string()
        .matches(phoneRegExp, "phone number is not valid")
        .required("number is required!"),
    }),
    message: yup
      .string()
      .min(1, "message is required!")
      .required("message is required!"),
  });

  // handle submit
  const handleSubmit = async (values) => {
    if (formik.errors) {
      formik.validateForm();
    }
    let body = {
      agents: [values?.agent],
      message: values?.message
    }

    setIsFetching(true)
    try {
      const res = await axios.post(
        `${SERVER_URL}api/link/unknown`,
        { ...body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        setUnknownLink(res.data?.shortLink?.username);
        setIsModal(true);
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
      setIsFetching(false)
    }
  };

  // handle check brand
  const handleCheckBrand = async (e) => {
    e.preventDefault();
    setIsBrand(false);
    setNotBrand(false);
    let body = {
      name: brandName,
    };

    setIsFetching(true)

    try {
      const res = await axios.post(
        `${SERVER_URL}api/link/brand/check`,
        { ...body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        console.log(res.data);
        setNotBrand(true);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 409) {
        setIsBrand(true)
        return
      }
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("something went wrong");
      }
    } finally {
      setIsFetching(false)
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
    validateOnChange: false,
  });

  const handleCloseModal = () => {
    setIsModal(false);
    setUnknownLink("");
    formik.resetForm()
  };

  const handleCloseBrand = () => {
    setNotBrand(false);
    setIsBrand(false);
    setBrandName("");
  };

  const handleAuth = () => {
    navigate("/register");
  };

  const handleContactUs = () => {
    navigate("/contact-us")
  };

  const handleTerms = () => {
    navigate('/terms-of-service')
  }

  const handlePrivacy = () => {
    navigate('/privacy-policy')
  }

  const handleRefund = () => {
    navigate('/refund-policy')
  }

  const handleToggleHamburger = () => {
    setIsMenuMobile(!isMenuMobile)
  }

  const handleCloseNav = () => {
    setIsMenuMobile(false)
  }

  const currentHost = window.location?.href ?? "https://app.flipchat.link/"


  return (
    <>
      {isModal && (
        <LandingModal
          handleCloseModal={handleCloseModal}
          handleAuth={handleAuth}
          unknownLink={unknownLink}
          isPremium={false}
        />
      )}
      <Toaster richColors duration={1000} position="text-center" />
      <div className="landing">
        <div className="landing-section">
          <div className="landing-container">
            {/* landing header */}
            <section className="landing-header">
              <div className="landing-header-logo">
                <img src={LOGO} alt="flipchat-logo" className="landing-logo" />
              </div>
              <div className="landing-header-nav">
                <a href="#features" className="landing-nav-item">
                  Features
                </a>
                <a href="#pricing" className="landing-nav-item">
                  Pricing
                </a>
                <a className="landing-nav-item" onClick={handleContactUs}>
                  Contact Us
                </a>
              </div>
              <div className="landing-header-cta">
                <button className="auth-cta btn-primary" onClick={handleAuth}>
                  Login / Register
                </button>
                <img src={HamburgerIcon} className="landing-header-menu-icon" onClick={handleToggleHamburger} />
              </div>
              <div className={`landing-nav-menu-mobile ${isMenuMobile === true ? "landing-nav-menu-mobile-open" : ""}`}>
                <div className="landing-nav-menu-mobile-header">
                  <img src={CrossIcon} alt="cross icon" className="landing-nav-cross-icon" onClick={handleCloseNav}/>
                </div>
                <div className="landing-header-nav-mobile">
                  <a href="#features" className="landing-nav-item-mobile" onClick={handleCloseNav}>
                    Features
                  </a>
                  <a href="#pricing" className="landing-nav-item-mobile" onClick={handleCloseNav}>
                    Pricing
                  </a>
                  <a className="landing-nav-item-mobile" onClick={handleContactUs}>
                    Contact Us
                  </a>
                </div>
                <button className="auth-cta btn-primary auth-cta-mobile" onClick={handleAuth}>
                  Login / Register
                </button>
              </div>
            </section>

            {/* landing showcase */}
            <section className="landing-showcase">
              <div className="landing-grid-left">
                <h1 className="showcase-title">Create Multi-agent</h1>
                <h1 className="showcase-title showcase-title-green">
                  WhatsApp links
                </h1>
                <p className="showcase-para">
                  Build you brand’s recognition and how get detailed insights on
                  how your links are performing
                </p>
                <button
                  className="showcase-cta btn-primary"
                  onClick={handleAuth}
                >
                  Generate WhatsApp Link
                </button>
              </div>
              <div className="landing-grid-right">
                <img
                  src={ShowcaseBG}
                  alt="showcase background image"
                  className="showcase-bg"
                />
              </div>
            </section>

            {/* Features */}
            <section id="features" className="landing-features">
              <div className="landing-features-head">
                <div className="landing-features-bar"></div>
                <h3 className="landing-features-title">Features</h3>
              </div>
              <p className="landing-features-para">
                Automatically distribute chats between multiple agents (WhatsApp
                lines) using one single link.
              </p>
              <h3 className="landing-features-sub-title">How It Works:</h3>
              <p className="landing-features-para">
                Your customers will click on your Multiagent link. Each click
                will open a chat with a different WhatsApp line. Try clicking
                multiple times on the following link to see a visual example:
              </p>

              <div className="landing-features-animation">
                <AgentAnimation />
              </div>
            </section>
          </div>
          {/* Sub Features */}
          <div className="sub-features">
            <div className="landing-container">
              <h3 className="sub-features-title">
                Create Your Free Link Today
              </h3>
              <div className="landing-form-flex">
                <form className="landing-form" onSubmit={formik.handleSubmit}>
                  <div className="form-item">
                    <label htmlFor="number" className="landing-form-label">
                      Type Your WhatsApp Number
                    </label>
                    <div className="form-input-flex">
                      <select
                        name={`agent.countryCode`}
                        id="countryCode"
                        className="landing-form-select"
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
                      <input
                        type="text"
                        name={`agent.number`}
                        id="number"
                        className="landing-form-input"
                        placeholder="Your phone number here...."
                        value={formik.values.agent.number}
                        onChange={formik.handleChange}
                        minLength={6}
                        maxLength={12}
                        required
                      />
                    </div>
                    {formik.errors.agent && (
                      <p className="error">{formik.errors.agent.number}</p>
                    )}
                  </div>
                  <div className="form-item">
                    <label htmlFor="message" className="landing-form-label">
                      Custom Message
                    </label>
                    <textarea
                      type="text"
                      name="message"
                      id="message"
                      className="landing-form-textarea"
                      rows={5}
                      placeholder="Add a custom message..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.message && (
                      <p className="error">{formik.errors.message}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn-primary landing-form-cta"
                  >
                    {isFetching ? <Spinner /> : "Generate My Link"}
                  </button>
                </form>
                <div className="landing-form-divider">{">"}</div>
                <Device
                  countryCode={formik.values.agent.countryCode}
                  number={formik.values.agent.number}
                  message={formik.values.message}
                />
              </div>

              <h3 className="sub-features-title">
                Find A FlipChat.link For Your Brand
              </h3>
              <form
                className="landing-find"
                method="POST"
                onSubmit={handleCheckBrand}
              >
                <input
                  type="text"
                  className="landing-find-input"
                  name="name"
                  id="name"
                  placeholder="Enter your brand name..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  minLength={3}
                  required
                />
                <button className="btn-primary landing-find-cta">
                  {" "}

                  <img src={SearchIcon} className="landing-find-cta-icon" />
                  Search FlipChat Link

                </button>
              </form>
              {notBrand && (
                <div className="brandcheck">
                  <div className="brandcheck-header">
                    <img
                      src={CrossIcon}
                      alt="cross icon"
                      className="brandcheck-cross"
                      onClick={handleCloseBrand}
                    />
                  </div>
                  <div className="brandcheck-body">
                    <h3 className="brandcheck-title">
                      🎉 flipchat.link/{brandName} 🎉{" "}
                      <span className="brandcheck-title-sub">
                        is available as a Premium Link.
                      </span>{" "}
                    </h3>
                    <p className="brandcheck-para">
                      It includes clicks analytics, multiple agent support,
                      updatable info and much more.
                    </p>
                    <p className="brandcheck-para">
                      Get it now before someone else does
                    </p>
                    <button className="brandcheck-cta btn-primary" onClick={handleAuth}>
                      Get It Now!
                    </button>
                  </div>
                </div>
              )}
              {isBrand && (
                <div className="brandcheck-found">
                  <div className="brandcheck-header">
                    <img
                      src={CrossIcon}
                      alt="cross icon"
                      className="brandcheck-cross"
                      onClick={handleCloseBrand}
                    />
                  </div>
                  <div className="brandcheck-body">
                    <h3 className="brandcheck-found-title">
                      😭 flipchat.link/{brandName} 😭{" "}
                      <span className="brandcheck-found-title-sub">
                        is not available. Please try another brand.
                      </span>{" "}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pricing */}
          <section id="pricing" className="landing-pricing">
            <div className="landing-container">
              <div className="landing-features-head">
                <div className="landing-features-bar"></div>
                <h3 className="landing-features-title">Pricing</h3>
              </div>
              <div className="landing-price-grid">
                <div className="price-grid-left">
                  <p className="landing-features-para">
                    WhatsApp click to chat links with enhanced features that
                    drive more customers to your chat
                  </p>
                  <div className="price-features">
                    <div className="price-features-item">
                      <img
                        src={CheckIcon}
                        alt="check icon"
                        className="price-features-item-icon"
                      />
                      <p className="price-features-item-para">
                        Branded links, FlipChat.link/YourBrand
                      </p>
                    </div>
                    <div className="price-features-item">
                      <img
                        src={CheckIcon}
                        alt="check icon"
                        className="price-features-item-icon"
                      />
                      <p className="price-features-item-para">
                        Clicks analytics by hour, day and month
                      </p>
                    </div>
                    <div className="price-features-item">
                      <img
                        src={CheckIcon}
                        alt="check icon"
                        className="price-features-item-icon"
                      />
                      <p className="price-features-item-para">
                        Edit phone, user message and URL anytime
                      </p>
                    </div>
                    <div className="price-features-item">
                      <img
                        src={CheckIcon}
                        alt="check icon"
                        className="price-features-item-icon"
                      />
                      <p className="price-features-item-para">
                        Appear as a result in our search engine
                      </p>
                    </div>
                    <div className="price-features-item">
                      <img
                        src={CheckIcon}
                        alt="check icon"
                        className="price-features-item-icon"
                      />
                      <p className="price-features-item-para">Email support</p>
                    </div>
                  </div>
                </div>
                <div className="price-grid-right">
                  <div className="price-card">
                    <div className="price-card-btn" onClick={handleAuth}>Essential - INR 499/month</div>
                    <ul className="price-card-list">
                      <li className="price-card-list-item">1 Branded Links</li>
                      <li className="price-card-list-item">
                        2 Agents Per Link
                      </li>
                    </ul>
                  </div>
                  <div className="price-card">
                    <div className="price-card-btn price-card-2" onClick={handleAuth}>Expand - INR 1999/month</div>
                    <ul className="price-card-list">
                      <li className="price-card-list-item">3 Branded Links</li>
                      <li className="price-card-list-item">
                        3 Agents Per Link
                      </li>
                    </ul>
                  </div>
                  <div className="price-card">
                    <div className="price-card-btn price-card-3" onClick={handleAuth}>Elite - INR 5999/month</div>
                    <ul className="price-card-list">
                      <li className="price-card-list-item">8 Branded Links</li>
                      <li className="price-card-list-item">
                        5 Agents Per Link
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section id="footer" className="landing-footer">
            <div className="landing-container">
              <div className="landing-footer-head">
                <img
                  src={MailIcon}
                  alt="mail icon"
                  className="landing-footer-head-icon"
                />
                <h3 className="landing-footer-head-title">Reach Out Today</h3>
              </div>

              <p className="landing-footer-para" on>
                Flipchat.link is neither associated with nor sponsored by
                WhatsApp LLC or Meta Platforms, Inc. We offer a service based on
                WhatsApp’s public API. By using our service, you are accepting
                our <a className="landing-footer-link" onClick={handleTerms}>terms of service</a>, <a className="landing-footer-link" onClick={handlePrivacy}>privacy policy</a> and <a className="landing-footer-link" onClick={handleRefund}>refund policy</a>
              </p>

              <p className="landing-footer-email">support@flipchat.link</p>
              <div className="landing-footer-social">
                <Link className="landing-footer-social-item">
                  <img src={Instagram} alt="instagram icon" />
                </Link>
                <Link className="landing-footer-social-item">
                  <img src={twitter} alt="twitter icon" />
                </Link>
                <Link className="landing-footer-social-item">
                  <img src={linkedin} alt="linkedin icon" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Landing;
