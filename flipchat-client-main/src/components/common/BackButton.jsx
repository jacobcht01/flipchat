import { useNavigate } from "react-router-dom";
import Direction from "../../assets/icon_direction.svg";

const BackButton = () => {

    const navigate = useNavigate()

    const handleBack = () => navigate("/dashboard")
  return (
    <div className="back-button" onClick={handleBack}>
      <img src={Direction} alt="back button" className="back-button-icon" />
      <p className="back-button-text">Back</p>
    </div>
  );
};

export default BackButton;
