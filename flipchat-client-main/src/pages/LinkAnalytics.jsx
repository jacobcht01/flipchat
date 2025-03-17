import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import CopyIcon from "../assets/icon_copy.svg";
import DeleteIcon from "../assets/icon_delete.svg";
import EditIcon from "../assets/icon_edit.svg";
import QRIcon from "../assets/icon_qr.svg";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { PLANS, SERVER_URL } from "../utils/utils";
import { toast, Toaster } from "sonner";
import { useAuthContext } from "../context/AuthContext";
import dayjs from "dayjs";
import Loader from "../components/loader";
import QRCode from "qrcode";
import FreeModal from "../components/modal/freeModal";
import CommonModal from "../components/modal/CommonModal";
import Analytics from "../components/analytics";
import Warning from "../components/common/Warning";
import Error from "../components/common/Error";

const LinkAnalytics = () => {
  const { id } = useParams();
  const [currentLink, setCurrentLink] = useState(null);
  const { userDetails } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedQR, setGeneratedQR] = useState("");
  const [qrModal, setQRModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  const copyToClpboard = () => {
    navigator.clipboard.writeText(`flipchat.link/${currentLink?.username}`);
  };

  // fetch link by id
  const fetchLinkById = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${SERVER_URL}api/link/shortLink/${id}`);
      if (res.data) {
        setCurrentLink(res.data?.link);
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

  // generate qr code
  const generateQR = async (text) => {
    try {
      const code = await QRCode.toDataURL(text);
      console.log(code);
      setGeneratedQR(code);
      setQRModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  // handle click delete link
  const handleClickDeleteLink = () => {
    setIsDelete(true);
  };
  // handle close qr modal
  const handleCloseQrModal = () => {
    setGeneratedQR("");
    setQRModal(false);
  };

  // handle submit qr modal
  const handleSubmitQr = () => {
    navigator.clipboard.writeText(`flipchat.link/${currentLink?.username}`);
    setGeneratedQR("");
    setQRModal(false);
  };

  // handle close delete modal
  const handleCloseDeleteModal = () => {
    setIsDelete(false);
  };

  // handle delete link
  const handleDeleteLink = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(
        `${SERVER_URL}api/link/delete/${currentLink?.linkType === PLANS.FREE ? "free" : "premium"
        }/${id}`
      );

      if (res.data) {
        toast.success(res.data?.message);
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
      setIsDelete(false);
      navigate("/dashboard");
    }
  };

  // handle edit link
  const handleEditLink = () => {
    navigate(`/dashboard/update/${currentLink?._id}`);
  };

  // qr modal content
  const qrModalContent = (
    <div className="qr-modal-content">
      <h3 className="qr-modal-title">Scan The QR Code</h3>
      <img src={generatedQR} alt="qr code" className="qr-modal-img" />
      <p className="qr-modal-text">{`flipchat.link/${currentLink?.username}`}</p>
    </div>
  );

  useEffect(() => {
    if (id) {
      fetchLinkById(id);
    }
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <Toaster richColors position="top-center" duration={2000} />
      {qrModal && (
        <FreeModal
          handleCancel={handleCloseQrModal}
          body={qrModalContent}
          handleSubmit={handleSubmitQr}
          submitText="Copy Link"
        />
      )}

      {isDelete && (
        <CommonModal
          handleCancel={handleCloseDeleteModal}
          handleSubmit={handleDeleteLink}
          header={"Delete Short Link !"}
          para={
            "Are you sure you want to delete this short link ? This action cannot be undone."
          }
          submitText="Delete"
        />
      )}

      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-header-title">
            <h3 className="dashboard-header-title-normal">Dashboard</h3>
            <div className="dashboard-header-title-divider"></div>
            <h3 className="dashboard-header-title-main">Analytics</h3>
          </div>
        </div>
        <div className="dashboard-main">
          <div className="analytics-container">
            <div className="create-head">
              <BackButton />
            </div>
            <div className="analytics-main">
              <div className="analytics-title">
                <h3 className="analytics-link">
                  flipchat.link/{currentLink?.username}
                </h3>
              </div>
              <div className="analytics-agents">
                {currentLink?.agents?.map((item, index) => {
                  const number = `${item?.countryCode} ${item?.number}`;
                  return <p className="analytics-agents-item" key={index + 1}>{number}</p>;
                })}
              </div>
              <p className="analytics-message">{currentLink?.message}</p>
              <div className="analytics-actions">
                <div
                  className="analytics-action-item"
                  data-tooltip-id="edit-link"
                  data-tooltip-content="edit link"
                  data-tooltip-delay-show={200}
                  onClick={handleEditLink}
                >
                  <img
                    src={EditIcon}
                    alt="cross icon"
                    className="landingModal-header-icon"
                  />
                  <Tooltip id="edit-link" />
                </div>
                <div
                  className="analytics-action-item"
                  data-tooltip-id="delete-link"
                  data-tooltip-content="delete link"
                  data-tooltip-delay-show={200}
                  onClick={handleClickDeleteLink}
                >
                  <img
                    src={DeleteIcon}
                    alt="cross icon"
                    className="landingModal-header-icon"
                  />
                  <Tooltip id="delete-link" />
                </div>
                <div
                  className="analytics-action-item"
                  data-tooltip-id="generate-qr"
                  data-tooltip-content="generate qr code"
                  data-tooltip-delay-show={200}
                  onClick={() =>
                    generateQR(`flipchat.link/${currentLink?.username}`)
                  }
                >
                  <img
                    src={QRIcon}
                    alt="cross icon"
                    className="landingModal-header-icon"
                  />
                  <Tooltip id="generate-qr" />
                </div>
                <div
                  className="analytics-action-item"
                  data-tooltip-id="copy-unknown-link"
                  data-tooltip-content="copy to clipboard"
                  data-tooltip-delay-show={200}
                  onClick={copyToClpboard}
                >
                  <img
                    src={CopyIcon}
                    alt="cross icon"
                    className="landingModal-header-icon"
                  />
                  <Tooltip id="copy-unknown-link" />
                </div>
              </div>
              <div className="analytics-data">
                <div className="analytics-data-block">
                  <p className="analytics-data-title">Status: </p>

                  {currentLink?.linkType === PLANS.FREE ? <div
                    className={`billing-status-tag analytics-billing-tag billing-success`}
                  >
                    Active
                  </div> : <div
                    className={`billing-status-tag analytics-billing-tag billing-${userDetails?.planType !== PLANS.FREE
                      ? "success"
                      : "failure"
                      }`}
                  >
                    {userDetails?.planType !== PLANS.FREE
                      ? "Active"
                      : "InActive"}
                  </div>}


                </div>
                <div className="analytics-data-block">
                  <p className="analytics-data-title">Updated At: </p>
                  <p className="analytics-data-text">
                    {dayjs(currentLink?.updatedAt).format("DD-MM-YYYY")}
                  </p>
                </div>
              </div>
              {userDetails?.planType !== PLANS.FREE ? <Analytics /> :

                <Error text={"Analytics are disabled for FREE plan."} linkText={"Upgrade Premium"}
                  link={"/dashboard/plans"} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkAnalytics;
