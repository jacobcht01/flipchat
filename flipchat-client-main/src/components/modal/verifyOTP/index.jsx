import { useEffect, useState } from "react";
import "../commonModal.css";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../../../utils/utils";
import { toast, Toaster } from "sonner";
import axios from "axios";

const VerifyOTP = ({ handleVerifyOtp, email, setIsLoading }) => {
  const [otp, setotp] = useState("");
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    handleVerifyOtp(otp);
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

  // handle otp send again
  const handleSendAgain = async () => {
    setIsLoading(true);

    let body = {
      email: email,
    };

    try {
      const res = await axios.post(
        `${SERVER_URL}api/otp/register/resend`,
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

  return (
    <>
      <Toaster richColors position="top-center" duration={2000} />
      <div className="modal">
        <div className="modal-container">
          <div className="modal-body">
            <h3 className="modal-title">Verify Your Email</h3>
            <p className="modal-para">
              A 6 digit verification code has been sent to your email
            </p>
            <form
              method="POST"
              className="modal-form"
              onSubmit={handleOnSubmit}
            >
              <div className="form-item">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  className="form-input"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                  required
                />
              </div>
              <div className="form-item">
                <p className="auth-footer-text">
                  Didn't receive otp ?{" "}
                  {isButtonDisabled ? (
                    <Link className="auth-forget">Resend after {timer}s</Link>
                  ) : (
                    <Link className="auth-forget" onClick={handleSendAgain}>
                      Send Again
                    </Link>
                  )}
                </p>
              </div>
              <button type="submit" className="auth-form-cta btn-primary">
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
