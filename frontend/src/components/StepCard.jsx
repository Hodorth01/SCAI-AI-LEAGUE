const StepCard = ({ icon, title }) => {
  return (
    <div className="d-flex flex-column align-items-center text-center p-3">
      {/* Icon */}
      <div className="mb-3"style={{ height: '120px' }}>
        <img 
          src={icon} 
          alt={title} 
          className="img-fluid h-100" 
          style={{ objectFit: 'contain' }}
          />
      </div>
      
      {/* Title */}
      <h3 className="text-white fw-bold text-capitalize mb-0">
        {title}
      </h3>
    </div>
  );
};

export default StepCard;