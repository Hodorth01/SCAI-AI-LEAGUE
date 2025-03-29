const ServiceCard = ({icon, title, description}) => {
    return (
        <div className="service-card">
            <div className="service-card-content d-flex flex-column">
                {/* Icon with fixed height container */}
                <div className="service-card-icon-container" style={{ height: '120px' }}>
                    <img 
                        className="service-card-icon h-100" 
                        src={icon} 
                        alt={title}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
                
                {/* Text content with consistent spacing */}
                <div className="service-card-text mt-3">
                    <div className="service-card-title">
                        {title}
                    </div>
                    <div className="service-card-description mt-2">
                       {description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;