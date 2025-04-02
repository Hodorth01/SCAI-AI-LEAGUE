import { useScrollAnimation } from '../hooks/useScrollAnimation';


const Footer = () => {
    const { sectionRef, addToHeadingRefs, addToTextRefs } = useScrollAnimation();
  

  return (
    <footer className="footer" ref={sectionRef}>
      <div className="container">
        {/* Logo section */}
        <div className="row justify-content-center mb-4" ref={addToHeadingRefs}>
          <div className="col-12 text-center">
            <h1 className="footer-logo mb-2">SEED</h1>
            <p className="footer-tagline">A NEW ERA OF SPORTS</p>
          </div>
        </div>

        {/* Divider line */}
        <div className="row justify-content-center mb-4" ref={addToTextRefs}>
          <div className="col-auto">
            <div className="footer-divider"></div>
          </div>
        </div>

        {/* Navigation */}
        <div className="row justify-content-center mb-4" ref={addToTextRefs}>
          <div className="col-auto">
            <div className="footer-nav">
              {['About', 'Services', 'Support', 'Leaderboard', 'History'].map((item) => (
                <a 
                  key={item} 
                  href="#" 
                  className="footer-nav-link"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Description text */}
        <div className="row justify-content-center mb-4" ref={addToTextRefs}>
          <div className="col-md-8 text-center">
            <p className="footer-description">
              Lorem ipsum Neque porro quisquam est qui do lorem ipsum quia dolor sit amet, Neque porro elit NeDque
            </p>
          </div>
        </div>

        {/* Social icons */}
        <div className="row justify-content-center mb-4" ref={addToTextRefs}>
          <div className="col-auto">
            <div className="footer-social">
              <a href="#" className="text-decoration-none">
                <i className="bi bi-twitter footer-social-icon"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-whatsapp footer-social-icon"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-instagram footer-social-icon"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row justify-content-center" ref={addToTextRefs}>
          <div className="col-12 text-center">
            <p className="footer-copyright">
              Copyright © 2023-2025 SEED All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;