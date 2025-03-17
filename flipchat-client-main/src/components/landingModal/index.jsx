import React from "react";
import "./landingModal.css";
import WhatsAppIcon from "../../assets/whatsapp-icon.svg";
import CheckIcon from "../../assets/check.svg";
import CrossIcon from "../../assets/cross.svg";
import CopyIcon from "../../assets/icon_copy.svg";
import { Tooltip } from "react-tooltip";

const LandingModal = ({ handleCloseModal, handleAuth, unknownLink, isPremium = false }) => {

  const copyToClpboard = () => {
    navigator.clipboard.writeText(`flipchat.link/${unknownLink}`);
  };
  return (
    <div className="landingModal-overlay">
      <div className="landingModal-content">
        <div className="landingModal-header">
          <img
            src={CrossIcon}
            alt="cross icon"
            className="landingModal-header-icon"
            onClick={handleCloseModal}
          />
        </div>
        <h3 className="landingModal-title">This is your WhatsApp short link</h3>
        <p className="landingModal-para">
          Copy and share it anywhere you want to be contacted instantly. (Use
          flipchat.link/{unknownLink ?? "abcd"} to send the message)
        </p>
        <div className="landingModal-highlight">
          <img
            src={WhatsAppIcon}
            alt="whatsapp icon"
            className="landingModal-highlight-image"
          />
          <h3 className="landingModal-highlight-text">
            flipchat.link/{"This is link"}
          </h3>
          <img
            src={CopyIcon}
            alt="copy icon"
            className="landingModal-highlight-copy"
            onClick={copyToClpboard}
            data-tooltip-id="copy-unknown-link"
            data-tooltip-content="copy to clipboard"
            data-tooltip-delay-show={200}
          />
          <Tooltip id="copy-unknown-link" />
        </div>
        {!isPremium && <div className="landingModal-premium">
          <p className="landingModal-premium-para">
            Get a premium plan from flipchat with:{" "}
          </p>
          <div className="landingModal-features">
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">
                Branded links, FlipChat.link/YourBrand
              </p>
            </div>
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">
                Clicks analytics by hour, day and month
              </p>
            </div>
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">
                Edit phone, user message and URL anytime
              </p>
            </div>
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">
                Appear as a result in our search engine
              </p>
            </div>
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">Email support</p>
            </div>
            <div className="landingModal-features-item feature-many-more">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">and many more</p>
            </div>

            <button
              onClick={handleAuth}
              className="landingModal-premium-cta btn-primary"
            >
              Get Premium Now
            </button>
          </div>
        </div>}

        {isPremium && <div className="landingModal-premium">
          <p className="landingModal-premium-para">
            Enjoy premium benefits with your premium link:
          </p>
          <div className="landingModal-features">
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">
                Clicks analytics by hour, day and month
              </p>
            </div>
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">
                Edit phone, user message and URL anytime
              </p>
            </div>
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">
                Appear as a result in our search engine
              </p>
            </div>
            <div className="landingModal-features-item">
              <img
                src={CheckIcon}
                alt="check icon"
                className="landingModal-features-item-icon"
              />
              <p className="landingModal-features-item-para">Email support</p>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default LandingModal;
