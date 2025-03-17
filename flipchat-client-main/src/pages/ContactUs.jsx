import React from "react";
import LOGO from "../assets/Flipchat-Transperent.png";
import Icon_Call from "../assets/icon_call.svg";
import Icon_Mail from "../assets/icon_mail.svg";
import Icon_Location from "../assets/icon_location.svg";
import MailIcon from "../assets/inbox.svg";
import Instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";
import { Link, useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/");
  };

  const handleAuth = () => {
    navigate("/register");
  };

  const handleContactUs = () => {
    navigate("/contact-us");
  };

  const handleTerms = () => {
    navigate("/terms-of-service");
  };

  const handlePrivacy = () => {
    navigate("/privacy-policy");
  };

  const handleRefund = () => {
    navigate("/refund-policy");
  };

  return (
    <div className="landing">
      <div className="landing-section">
        <div className="landing-container">
          {/* landing header */}
          <section className="landing-header">
            <div className="landing-header-logo" onClick={handleDashboard}>
              <img src={LOGO} alt="flipchat-logo" className="landing-logo" />
            </div>
            <div className="landing-header-nav"></div>
            <div className="landing-header-cta">
              <button className="auth-cta btn-primary" onClick={handleAuth}>
                Login / Register
              </button>
            </div>
          </section>
        </div>
      </div>
      <section className="contact-showcase">
        <div className="landing-container">
          <div className="contact-showcase-block">
            <h3 className="contact-showcase-title">Get In Touch With Us</h3>
            <p className="contact-showcase-para">
              Feel free to contact us. Whenever you have any inquiry, just ask
              us. We are happy to assist you. If you are our existing customer,
              we love to hear your experience with us.
            </p>
          </div>
        </div>
      </section>

      <section className="terms-section">
        <div className="landing-container">
          <div className="contact-cards-block">
            <div className="contact-cards">
              <div className="contact-card">
                <img
                  src={Icon_Call}
                  alt="icon call"
                  className="contact-card-img"
                />
                <p className="contact-card-para contact-card-para-phone">
                  Ph: +919643084923
                </p>
                <p className="contact-card-para contact-card-para-phone">
                  Ph: +917827535358
                </p>
              </div>
              <div className="contact-card">
                <img
                  src={Icon_Mail}
                  alt="icon call"
                  className="contact-card-img"
                />
                <p className="contact-card-para contact-card-para-phone">
                  Email: support@flipchat.link
                </p>
              </div>
              <div className="contact-card">
                <img
                  src={Icon_Location}
                  alt="icon call"
                  className="contact-card-img"
                />
                <p className="contact-card-para contact-card-para-phone">
                  Head Office: 702, Amba Tower,
                </p>
                <p className="contact-card-para contact-card-para-phone">
                  Sector 9. Rohini, Delhi - 110085
                </p>
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
            <h3 className="landing-footer-head-title">React Out Today</h3>
          </div>

          <p className="landing-footer-para" on>
            Flipchat.link is neither associated with nor sponsored by WhatsApp
            LLC or Meta Platforms, Inc. We offer a service based on WhatsApp’s
            public API. By using our service, you are accepting our{" "}
            <a className="landing-footer-link" onClick={handleTerms}>
              terms of service
            </a>
            ,{" "}
            <a className="landing-footer-link" onClick={handlePrivacy}>
              privacy policy
            </a>{" "}
            and{" "}
            <a className="landing-footer-link" onClick={handleRefund}>
              refund policy
            </a>
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
  );
};

export default ContactUs;
