
import "./EmergencyCard.css"
const EmergencyCard = ({image, name, color, contact}) => {
    return (
        <div className="emergency-card">
            <div className="emergency-card-image" style={{ background: color }}>
                <img src={image} alt="Emergency image" />
            </div>
            <div className="emergency-card-content">
                <p>{name}</p>
                <p>{contact}</p>
            </div>
        </div>
    );
};

export default EmergencyCard;