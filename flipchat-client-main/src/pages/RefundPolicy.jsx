import React, { useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import LOGO from "../assets/Flipchat-Transperent.png";

const RefundPolicy = () => {
    const navigate = useNavigate();

    const handleDashboard = () => {
        navigate("/")
    }

    const handleAuth = () => {
        navigate("/register");
    };

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="landing">
            <div className="landing-section">
                <div className="landing-container">
                    {/* landing header */}
                    <section className="landing-header">
                        <div className="landing-header-logo" onClick={handleDashboard}>
                            <img src={LOGO} alt="flipchat-logo" className="landing-logo" />
                        </div>
                        <div className="landing-header-nav">
                        </div>
                        <div className="landing-header-cta">
                            <button className="auth-cta btn-primary" onClick={handleAuth}>
                                Login / Register
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <section className="landing-pricing">
                <div className="landing-container">
                    <div className="landing-features-head terms-header">
                        <div className="landing-features-bar"></div>
                        <h3 className="landing-features-title">Refund Policy</h3>
                    </div>
                    <div className="landing-features-body">
                        <div className="terms-sub-block">
                            <h3 className='terms-sub-header'>No Refunds or Returns</h3>

                            <p className='terms-sub-para'>
                                At FlipChat, we offer digital software products, which are non-returnable and non-refundable once purchased. All sales are final.
                            </p>
                            <p className='terms-sub-para'>
                                Before completing a purchase, we encourage customers to review product details carefully. If you have any questions or concerns about our software, please reach out to our support team at <span className='terms-bold-span'>support@flipchat.link</span> before making a purchase.

                            </p>
                        </div>
                        <div className="terms-sub-block">
                            <h3 className='terms-sub-header'>Exceptions</h3>
                            <p className='terms-sub-para'>
                                Refunds may only be considered in the following cases:
                            </p>
                            <p className='terms-sub-para'>
                                - Duplicate charges due to a billing error.
                            </p>
                            <p className='terms-sub-para'>
                                - Failure to receive access to the software due to a technical issue on our end, which remains unresolved after contacting our support team.
                            </p>
                            <p className='terms-sub-para'>
                                Any refund requests must be submitted within 7 days of purchase with relevant proof of the issue. All refund requests will be reviewed on a case-by-case basis, and FlipChat reserves the right to deny any refund requests that do not meet the above criteria.
                            </p>
                        </div>
                        <div className="terms-sub-block">
                            <h3 className='terms-sub-header'>Technical Support</h3>
                            <p className='terms-sub-para'>
                                If you experience any technical difficulties with our software, our support team is available to assist you. Please contact us at support@flipchat.link for troubleshooting and assistance.
                            </p>
                            <p className='terms-sub-para'>
                                By purchasing our software, you acknowledge and agree to this refund policy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default RefundPolicy