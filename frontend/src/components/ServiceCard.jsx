const ServiceCard = ({icon, title, description}) => {
    return (
        <div className="service-card">
            <div className="service-card-content">
                <img className="service-card-icon" src={icon} alt={title} />
                <div className="service-card-text">
                    <div className="service-card-title">
                        {title}
                    </div>
                    <div className="service-card-description">
                       {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;