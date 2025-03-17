import React, { useLayoutEffect } from 'react'
import LOGO from "../assets/Flipchat-Transperent.png";
import { useNavigate } from 'react-router-dom';

const Policy = () => {

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
                    <div className="landing-features-head policy-header">
                        <div className="landing-features-bar"></div>
                        <h3 className="landing-features-title">Privacy Policy</h3>
                    </div>
                    <div className='policy-last-updated-container'>
                        <p className='policy-last-updated'>Last updated: January 19, 2025</p>
                    </div>
                    <div className="landing-features-body">
                        <div className="terms-sub-block">
                            <h3 className='terms-sub-header'>SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h3>

                            <p className='terms-sub-para'>
                                When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.
                            </p>
                            <p className='terms-sub-para'>
                                When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.

                            </p>
                            <p className='terms-sub-para'>
                                Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.

                            </p>
                        </div>
                        <div className="terms-sub-block">
                            <h3 className='terms-sub-header'>SECTION 2 - CONSENT</h3>
                            <h3 className='terms-sub-sub-header'>How do you get my consent?</h3>
                            <p className='terms-sub-para'>
                                When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.
                            </p>
                            <p className='terms-sub-para'>
                                If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.
                            </p>
                        </div>
                        <div className="terms-sub-block">
                            <h3 className='terms-sub-sub-header'>How do I withdraw my consent?</h3>
                            <p className='terms-sub-para'>
                                If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at <span className='terms-bold-span'>support@flipchat.link</span> or mailing us at: <span className='terms-bold-span'>702, Amba Tower, Sector 9, Rohini, Delhi - 110085</span>
                            </p>
                        </div>
                        <div className="terms-sub-block">
                            <h3 className='terms-sub-header'>SECTION 3 - DISCLOSURE</h3>
                            <p className='terms-sub-para'>
                                We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
                            </p>
                        </div>
                        <div className="terms-sub-block">
                            <h3 className='terms-sub-header'>SECTION 4 - PAYMENT</h3>
                            <p className='terms-sub-para'>
                                We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
                            </p>
                            <p className='terms-sub-para'>
                                Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.
                            </p>
                            <p className='terms-sub-para'>
                                For more insight, you may also want to read terms and conditions of razorpay on <span className='terms-bold-span'>https://razorpay.com</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='terms-section'>
                <div className="landing-container">
                    <div className="terms-sub-block">
                        <h3 className='terms-sub-header'>SECTION 5 - THIRD-PARTY SERVICES</h3>
                        <p className='terms-sub-para'>
                            In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.
                        </p>
                        <p className='terms-sub-para'>
                            However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.
                        </p>
                        <p className='terms-sub-para'>
                            For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.
                        </p>
                        <p className='terms-sub-para'>
                            In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.
                        </p>
                        <p className='terms-sub-para'>
                            Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.
                        </p>
                    </div>
                    <div className="terms-sub-block">
                        <h3 className='terms-sub-sub-header'>Links</h3>
                        <p className='terms-sub-para'>
                            When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
                        </p>
                    </div>
                    <div className="terms-sub-block">
                        <h3 className='terms-sub-header'>SECTION 6 - SECURITY</h3>
                        <p className='terms-sub-para'>
                            To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.
                        </p>
                    </div>
                    <div className="terms-sub-block">
                        <h3 className='terms-sub-header'>SECTION 7 - COOKIES</h3>
                        <p className='terms-sub-para'>
                            We use cookies to maintain the session of your user. It is not used to personally identify you on other websites.
                        </p>
                    </div>
                    <div className="terms-sub-block">
                        <h3 className='terms-sub-header'>SECTION 8 - AGE OF CONSENT</h3>
                        <p className='terms-sub-para'>
                            By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
                        </p>
                    </div>
                    <div className="terms-sub-block">
                        <h3 className='terms-sub-header'>SECTION 9 - CHANGES TO THIS PRIVACY POLICY</h3>
                        <p className='terms-sub-para'>
                            We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.
                        </p>
                        <p className='terms-sub-para'>
                            If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
                        </p>
                    </div>
                    <div className="terms-sub-block">
                        <h3 className='terms-sub-header'>QUESTIONS AND CONTACT INFORMATION</h3>
                        <p className='terms-sub-para'>
                            If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at <span className='terms-bold-span'>support@flipchat.link</span> or by mail at 702, Amba Tower, Sector 9, Rohini, Delhi - 110085.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Policy