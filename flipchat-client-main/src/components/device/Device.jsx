import React from 'react';
import "./device.css";
import ProfileIcon from "../../assets/profile.svg";
import PlaneIcon from "../../assets/plane.svg";

const Device = ({ countryCode, number, message }) => {
  return (
    <div className='device'>
      <div className="device-container">
        <div className="device-container-top">
          <img src={ProfileIcon} alt="profile icon" className='device-profile-icon' />
          <p className='device-country-code'>{countryCode}</p>
          <p className='device-number'>{number}</p>
        </div>
        <div className="device-container-middle">

        </div>
        <div className="device-container-bottom">
          <input type="text" name='device-text' className='device-text-field' value={message} disabled/>
          <img src={PlaneIcon} alt="plane icon" className='device-plane-icon'/>
        </div>
      </div>
    </div>
  )
}

export default Device