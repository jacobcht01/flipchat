import { useNavigate } from "react-router-dom";
import WarningIcon from "../../assets/icon_warning.svg";

const Warning = ({ text, linkText, link }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(link);
  };

  return (
    <div className="warning">
      <img src={WarningIcon} alt="warning icon" className="warning-icon" />
      <div className="warning-content">
        <p className="warning-text">{text}</p>
        {link && (
          <p className="warning-link" onClick={handleNavigate}>
            {linkText}
          </p>
        )}
      </div>
    </div>
  );
};

export default Warning;
