import { useState } from "react";
import ArrowIcon from "../assets/icon_arrow.svg";
import { Link } from "react-router-dom";

const Help = () => {
  const ACCORDION_LIST = [
    {
      id: 1,
      title: <p className="faq-item-title-text">What is a WhatsApp Chat Link ?</p>,
      content:
        <p className="faq-item-content-text">A WhatsApp chat link is a short URL that opens your chat window on WhatsApp with just one click, allowing businesses and individuals to initiate conversations without saving the contact number. For example, <Link className="faq-redirect-text" to={"/dashboard"}>Click HERE</Link></p>
    },
    {
      id: 2,
      title: <p className="faq-item-title-text">What is an Agent in <span className="plan-main-para-span">Flipchat.link</span> ?</p>,
      content:
        <p className="faq-item-content-text">An agent is a contact (WhatsApp number) that is linked to a generated WhatsApp link. For users on the premium plan, you can add multiple agents to a single link, allowing dynamic rotation and better management of incoming messages.</p>,
    },
    {
      id: 3,
      title: <p className="faq-item-title-text">How Does the Dynamic Link Rotation Work ?</p>,
      content:
        <p className="faq-item-content-text">Dynamic link rotation allows a single WhatsApp link to redirect users to one of multiple specified WhatsApp numbers randomly. This feature ensures that incoming messages are evenly distributed among the agents.</p>,
    },
    {
      id: 4,
      title: <p className="faq-item-title-text">How Can I Create a Link with a Custom (Branded) URL ?</p>,
      content:
        <p className="faq-item-content-text"> If you’d like to create a link with a custom URL like <span className="plan-main-para-span">flipchat.link/YourBrand</span>, you can register for Flipchat Premium to get all the benefits, including custom URLs </p>,
    },
    {
      id: 5,
      title: <p className="faq-item-title-text">What Are the Benefits of Using <span className="plan-main-para-span">Flipchat.link</span> for My Business ?</p>,
      content:
        <p className="faq-item-content-text">Using <span className="plan-main-para-span">Flipchat.link</span> can streamline communication with your customers, provide a professional appearance with branded links, and improve customer management with dynamic link rotation. It also offers detailed analytics to help you track link performance and optimize your communication strategy.</p>,
    },
  ];

  const [selected, setSelected] = useState(0);

  const handleOpenAccordion = (value) => {
    if (selected === value) {
      setSelected(0);
    } else {
      setSelected(value);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-header-title">
          <h3 className="dashboard-header-title-normal">Dashboard</h3>
          <div className="dashboard-header-title-divider"></div>
          <h3 className="dashboard-header-title-main">Help</h3>
        </div>
      </div>
      <div className="dashboard-main">
        <div className="plan-main-text">
          <p className="plan-main-para">
            For any issue, please don't hesitate to reach out to us at:{" "}
            <span className="plan-main-para-span">flipchat@link.com</span>
          </p>
        </div>

        <div className="help-accordion">
          <h3 className="help-accordion-title">Frequently Asked Questions</h3>
          <p className="help-accordion-para">
            Your time is precious, so we have assembled some quick answers to
            questions you may have about{" "}
            <span className="plan-main-para-span">Flipchat.link</span>
          </p>

          <div className="help-accordion-faq">
            {ACCORDION_LIST?.map((item) => {
              return (
                <div key={item.id} className={`faq-item ${selected === item.id ? "open-accordion" : ""}`} onClick={() => handleOpenAccordion(item.id)}>
                  <div className="faq-item-title">
                    {item?.title}
                    <img
                      src={ArrowIcon}
                      alt="arrow icon"
                      className="faq-item-title-icon"
                    />
                  </div>
                  <div className="faq-item-content">
                    {item.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
