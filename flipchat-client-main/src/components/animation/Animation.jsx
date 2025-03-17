import React, { useState, useRef } from "react";
import "./Animation.css";
import WhatsappIcon from "../../assets/whatsapp-icon.svg";
import ChatVector from "../../assets/chat-vector.svg";
import { useMediaQuery } from "react-responsive";

const Animation = () => {
  const [counter, setCounter] = useState(0);

  const isMobile = useMediaQuery({ query: '(max-width: 786px)' })

  const iconRef = useRef();
  const item1Ref = useRef();
  const item2Ref = useRef();
  const item3Ref = useRef();

  function animate(icon, items) {
    const options = {
      duration: 1000,
      easing: "ease-in-out",
      delay: 10,
      iterations: 1,
      fill: "forwards",
    };
    const iconAnimationForward = [
      { transform: `translateX(-30px)`, offset: 0 },
      { transform: "translateX(160px)", offset: 1 },
    ];
    const iconAnimationForwardMobile = [
      { transform: `translateX(-30px)`, offset: 0 },
      { transform: "translateX(100px)", offset: 1 },
    ];
    const iconAnimationUpwards = [
      { transform: "translate(0px)", offset: 0 },
      { transform: "translate(160px, -120px)", offset: 1 },
    ];
    const iconAnimationUpwardsMobile = [
      { transform: "translate(0px)", offset: 0 },
      { transform: "translate(100px, -80px)", offset: 1 },
    ];
    const iconAnimationDownwards = [
      { transform: "translate(0px)", offset: 0 },
      { transform: "translate(160px, 100px)", offset: 1 },
    ];
    const iconAnimationDownwardsMobile = [
      { transform: "translate(0px)", offset: 0 },
      { transform: "translate(100px, 60px)", offset: 1 },
    ];
    const itemActiveAnimation = [
      { transform: "scale(1)", opacity: 0.4, offset: 0 },
      { transform: "scale(1.2)", opacity: 1, offset: 1 },
    ];
    const itemInactiveAnimation = [
      { transform: "scale(1)", opacity: 0.4, offset: 0 },
      { transform: "scale(0.8)", opacity: 0.4, offset: 1 },
    ];

    switch (counter) {
      case 0:
        if (isMobile) {
          icon.animate(iconAnimationUpwardsMobile, options);
          items.item1.animate(itemActiveAnimation, options);
          items.item2.animate(itemInactiveAnimation, options);
          items.item3.animate(itemInactiveAnimation, options);
          setCounter(counter + 2);
        } else {
          icon.animate(iconAnimationUpwards, options);
          items.item1.animate(itemActiveAnimation, options);
          items.item2.animate(itemInactiveAnimation, options);
          items.item3.animate(itemInactiveAnimation, options);
          setCounter(counter + 2);
        }

        break;
      case 1:
        if (isMobile) {
          icon.animate(iconAnimationUpwardsMobile, options);
          items.item1.animate(itemActiveAnimation, options);
          items.item2.animate(itemInactiveAnimation, options);
          items.item3.animate(itemInactiveAnimation, options);
          setCounter(counter + 1);
        } else {
          icon.animate(iconAnimationUpwards, options);
          items.item1.animate(itemActiveAnimation, options);
          items.item2.animate(itemInactiveAnimation, options);
          items.item3.animate(itemInactiveAnimation, options);
          setCounter(counter + 1);
        }
        break;
      case 2:
        if (isMobile) {
          icon.animate(iconAnimationForwardMobile, options);
          items.item1.animate(itemInactiveAnimation, options);
          items.item2.animate(itemActiveAnimation, options);
          items.item3.animate(itemInactiveAnimation, options);
          setCounter(counter + 1);
        } else {
          icon.animate(iconAnimationForward, options);
          items.item1.animate(itemInactiveAnimation, options);
          items.item2.animate(itemActiveAnimation, options);
          items.item3.animate(itemInactiveAnimation, options);
          setCounter(counter + 1);
        }
        break;
      case 3:
        if (isMobile) {
          icon.animate(iconAnimationDownwardsMobile, options);
          items.item1.animate(itemInactiveAnimation, options);
          items.item2.animate(itemInactiveAnimation, options);
          items.item3.animate(itemActiveAnimation, options);
          setCounter(1);
        } else {
          icon.animate(iconAnimationDownwards, options);
          items.item1.animate(itemInactiveAnimation, options);
          items.item2.animate(itemInactiveAnimation, options);
          items.item3.animate(itemActiveAnimation, options);
          setCounter(1);
        }
        break;
      default:
        return;
    }
  }

  function handleLinkClick(e) {
    e.preventDefault();

    let icon = iconRef.current;
    let item1 = item1Ref.current;
    let item2 = item2Ref.current;
    let item3 = item3Ref.current;
    let items = {
      item1,
      item2,
      item3,
    };

    animate(icon, items);
  }

  return (
    <>
      <div className="animationCard">
        <div className="animationContainer">
          <p className="animationLink" onClick={handleLinkClick}>flipchat.link/YourBrand</p>
          <div
            ref={iconRef}
            id="icon"
            className="animationIcon"
            onClick={handleLinkClick}
          >
            <img src={ChatVector} alt="chat vector" className="chat-vector" />
          </div>
          <svg className="animationPaths" viewBox="0 0 100 100">
            <path d="M 35,49 L 64,23 L 68,23" fill="transparent" />
            <circle cx="68" cy="23" r="1" fill="#00b66c" stroke="none" />
            <path d="M 35,49 L 68,49" fill="transparent" />
            <circle cx="68" cy="49" r="1" fill="#00b66c" stroke="none" />
            <path d="M 35,49 L 64,75 L 68,75" fill="transparent" />
            <circle cx="68" cy="75" r="1" fill="#00b66c" stroke="none" />
          </svg>
          <div className="animationItems">
            <div ref={item1Ref} id="item1" className="animationItem">
              <img
                src={WhatsappIcon}
                alt="whatsapp icon"
                className="animationItem-image"
              />
              <p className="animationItem-text">Line 1</p>
            </div>
            <div ref={item2Ref} id="item2" className="animationItem">
              <img
                src={WhatsappIcon}
                alt="whatsapp icon"
                className="animationItem-image"
              />
              <p className="animationItem-text">Line 2</p>
            </div>
            <div ref={item3Ref} id="item3" className="animationItem">
              <img
                src={WhatsappIcon}
                alt="whatsapp icon"
                className="animationItem-image"
              />
              <p className="animationItem-text">Line 3</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Animation;
