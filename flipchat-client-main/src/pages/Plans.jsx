import { useState } from "react";
import Check from "../assets/check.svg";
import CommonModal from "../components/modal/CommonModal";
import { useAuthContext } from "../context/AuthContext";
import Warning from "../components/common/Warning";
import { PLANS, PLANS_RATE } from "../utils/utils";
import { toast } from "sonner";
import axios from "axios";
import Loader from "../components/loader";

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

const Plans = () => {
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({
    amount: 0,
    planType: "",
  });

  const { userDetails, fetchUserDetails } = useAuthContext();

  const handleCloseModal = () => {
    setSelectedPlan({
      amount: 0,
      planType: "",
    });
    setIsModal(false);
  };

  // handle process payment
  const handleProcessPayment = async (response) => {
    setIsLoading(true);

    const newBody = {
      razorpay_order_id: response?.razorpay_order_id,
      razorpay_payment_id: response?.razorpay_payment_id,
      razorpay_signature: response?.razorpay_signature,
    };

    try {
      const res = await axios.post(`${SERVER_URL}api/payment/process/payment`, {
        ...newBody,
      });

      if (res.data) {
        toast.success(res.data?.message);
        await fetchUserDetails(userDetails?.id);
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

  // handle subscribe
  const handleSubmit = async () => {
    setIsModal(false);
    setIsLoading(true);
    try {
      // get razorpay key
      const {
        data: { key },
      } = await axios.get(`${SERVER_URL}api/payment/key`);

      let body = {
        userId: userDetails?.id,
        planType: selectedPlan?.planType,
        amount: selectedPlan?.amount,
      };

      // create order
      const {
        data: { order },
      } = await axios.post(`${SERVER_URL}api/payment/create/order`, {
        ...body,
      });

      const options = {
        key,
        amount: order?.amount,
        currency: "INR",
        name: "FlipChat",
        description: "FlipChat Premium Subscription",
        order_id: order?.id,
        callback_url: `${SERVER_URL}api/payment/process/payment`,
        prefill: {
          name: userDetails?.name,
          email: userDetails?.email,
          contact: userDetails?.phone?.number,
        },
        handler: handleProcessPayment,
        notes: order?.notes,
        theme: {
          color: "#109449",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
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

  // handle checkout
  const checkoutHandler = async (amount, planType) => {
    setSelectedPlan((plan) => ({
      ...plan,
      amount: amount,
      planType: planType,
    }));
    setIsModal(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isModal && (
        <CommonModal
          header={"Do you want to proceed ?"}
          para={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore dignissimos quibusdam nihil ducimus rem."
          }
          handleCancel={handleCloseModal}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header-title">
            <h3 className="dashboard-header-title-normal">Dashboard</h3>
            <div className="dashboard-header-title-divider"></div>
            <h3 className="dashboard-header-title-main">Plans</h3>
          </div>
        </div>
        <div className="dashboard-main">
          <div className="plan-main-text">
            <p className="plan-main-para">
              At <span className="plan-main-para-span">Flipchat.link</span>, we
              offer a range of plans tailored to meet the diverse needs of our
              users. Whether you're just starting out, looking to grow, or
              managing a large business, we have a plan that will help you
              connect with your customers more effectively.
            </p>
          </div>

          {userDetails?.planType === PLANS.FREE && (
            <div className="dashboard-main-warning">
              <Warning
                text={"You don't have an active plan."}
                linkText={"Upgrade Now"}
                link={"/dashboard/plans"}
              />
            </div>
          )}

          <div className="plan-card-grid">
            <div className="plan-card-item">
              <div className="plan-card-item-header">
                <h3 className="plan-card-item-title">Plan - Essential</h3>
                <h3 className="plan-card-item-price">INR 499/month</h3>
                <p className="plan-card-item-sub-title">Features & Benefits</p>
              </div>
              <div className="plan-card-item-main">
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">1 Custom Link</p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">
                    2 Whatsapp agent support per link
                  </p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">Analytics Dashboard</p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">
                    Access to 24*7 email support
                  </p>
                </div>
              </div>
              {userDetails?.planType === PLANS.ESSENTIAL ? (
                <button className="btn-secondary cta-upgrade">
                  Currently Active
                </button>
              ) : (
                <button
                  className="btn-primary cta-upgrade"
                  onClick={() =>
                    checkoutHandler(PLANS_RATE.ESSENTIAL, PLANS.ESSENTIAL)
                  }
                >
                  {PLANS[userDetails?.planType] === PLANS.FREE
                    ? "Buy Now"
                    : PLANS_RATE[userDetails?.planType] > PLANS_RATE.ESSENTIAL
                    ? "Downgrade Now"
                    : "Upgrade Now"}
                </button>
              )}
            </div>
            <div className="plan-card-item">
              <div className="plan-card-item-header">
                <h3 className="plan-card-item-title">Plan - Expand</h3>
                <h3 className="plan-card-item-price">INR 1999/month</h3>
                <p className="plan-card-item-sub-title">Features & Benefits</p>
              </div>
              <div className="plan-card-item-main">
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">3 Custom Link</p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">
                    3 Whatsapp agent support per link
                  </p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">Analytics Dashboard</p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">
                    Access to 24*7 email support
                  </p>
                </div>
              </div>
              {userDetails?.planType === PLANS.EXPAND ? (
                <button className="btn-secondary cta-upgrade">
                  Currently Active
                </button>
              ) : (
                <button
                  className="btn-primary cta-upgrade"
                  onClick={() =>
                    checkoutHandler(PLANS_RATE.EXPAND, PLANS.EXPAND)
                  }
                >
                  {PLANS[userDetails?.planType] === PLANS.FREE
                    ? "Buy Now"
                    : PLANS_RATE[userDetails?.planType] > PLANS_RATE.EXPAND
                    ? "Downgrade Now"
                    : "Upgrade Now"}
                </button>
              )}
            </div>
            <div className="plan-card-item">
              <div className="plan-card-item-header">
                <h3 className="plan-card-item-title">Plan - Elite</h3>
                <h3 className="plan-card-item-price">INR 5999/month</h3>
                <p className="plan-card-item-sub-title">Features & Benefits</p>
              </div>
              <div className="plan-card-item-main">
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">8 Custom Link</p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">
                    5 Whatsapp agent support per link
                  </p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">Analytics Dashboard</p>
                </div>
                <div className="plan-card-list-item">
                  <img
                    src={Check}
                    alt="check icon"
                    className="plan-card-list-icon"
                  />
                  <p className="plan-card-list-text">
                    Access to 24*7 email support & WhatsApp support
                  </p>
                </div>
              </div>
              {userDetails?.planType === PLANS.ELITE ? (
                <button className="btn-secondary cta-upgrade">
                  Currently Active
                </button>
              ) : (
                <button
                  className="btn-primary cta-upgrade"
                  onClick={() => checkoutHandler(PLANS_RATE.ELITE, PLANS.ELITE)}
                >
                  {PLANS[userDetails?.planType] === PLANS.FREE
                    ? "Buy Now"
                    : PLANS_RATE[userDetails?.planType] > PLANS_RATE.ELITE
                    ? "Downgrade Now"
                    : "Upgrade Now"}
                </button>
              )}
            </div>
          </div>

          <div className="plan-main-text">
            <p className="plan-main-para">
              <span className="plan-main-para-blue">Still Not Sure?</span> Our
              flexible plans allow you to choose exactly what you need. Start
              small and upgrade anytime as your business grows. If you’re ready
              to enhance your WhatsApp communication, choose a plan that suits
              your business and start experiencing the benefits today!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Plans;
