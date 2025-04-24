import { useEffect, useRef, useState } from "react";
// import Particles from "react-tsparticles";

const WaitingList = () => {
  const wrapperRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    mobile: "",
  });
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const submitButtonRef = useRef(null);



  useEffect(() => {
    // Parallax Effect
    const wrapper = wrapperRef.current;
    const perspective = 15;
    let rafId = null;

    const handleMouseMove = (e) => {
      if (!wrapper) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const rotateX = ((clientY / innerHeight) - 0.5) * perspective * -1;
      const rotateY = ((clientX / innerWidth) - 0.5) * perspective;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
    };

    const handleMouseLeave = () => {
      if (!wrapper) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        wrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
      });
    };

    if (window.matchMedia("(min-width: 901px)").matches) {
      document.body.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const { firstName, lastName, email, age, mobile } = formData;
    const errors = {};

    if (!firstName) errors.firstName = "First name is required.";
    if (!lastName) errors.lastName = "Last name is required.";
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) errors.email = "Invalid email address.";
    
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum)) errors.age = "Please enter a valid age.";
    else if (ageNum < 1 || ageNum > 120) errors.age = "Age must be between 1 and 120.";
    
    const mobilePattern = /^[0-9\s+-]*$/;
    if (!mobile || !mobilePattern.test(mobile)) {
      errors.mobile = "Invalid characters in mobile number.";
    } else if (mobile.replace(/[\s+-]/g, "").length < 7) {
      errors.mobile = "Mobile number too short.";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setMessage("Processing...");
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
      submitButtonRef.current.textContent = "Processing...";
    }

    setTimeout(() => {
      setSubmitted(true);
      setMessage("Access request received. Standby for confirmation.");
      if (submitButtonRef.current) {
        submitButtonRef.current.textContent = "Request Received";
        submitButtonRef.current.classList.add("submitted-success");
      }
    }, 1500);
  };

  return (
    <div className="waitlist-page">
      <div className="waitlist-wrapper" ref={wrapperRef}>
        <div className="waitlist-container">
          <div className="layout-grid">
            <div className="content-column">
              <div className="icon-area">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 13.75l-1.25-1.75L14.25 12l1.5-1.75L17 8.5l1.25 1.75L19.75 12l-1.5 1.75z"
                  />
                </svg>
              </div>
              <h1>
                Enter the <span>SEED</span> Protocol
              </h1>
              <p>
                Grant yourself priority access. Register below to secure your
                position and be notified the moment the system goes live.
              </p>
              <div className="accent-line"></div>
            </div>

            <div className="form-column">
              <form
                className="waitlist-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="input-grid">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      className={`form-input ${formErrors.firstName ? "invalid" : ""}`}
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.firstName && (
                      <div className="error-message">{formErrors.firstName}</div>
                    )}
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      className={`form-input ${formErrors.lastName ? "invalid" : ""}`}
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.lastName && (
                      <div className="error-message">{formErrors.lastName}</div>
                    )}
                  </div>
                </div>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-input ${formErrors.email ? "invalid" : ""}`}
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && (
                    <div className="error-message">{formErrors.email}</div>
                  )}
                </div>
                <div className="input-grid">
                  <div className="input-wrapper">
                    <input
                      type="number"
                      id="age"
                      name="age"
                      className={`form-input ${formErrors.age ? "invalid" : ""}`}
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="1"
                      max="120"
                    />
                    {formErrors.age && (
                      <div className="error-message">{formErrors.age}</div>
                    )}
                  </div>
                  <div className="input-wrapper">
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className={`form-input ${formErrors.mobile ? "invalid" : ""}`}
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.mobile && (
                      <div className="error-message">{formErrors.mobile}</div>
                    )}
                  </div>
                </div>
                <button type="submit" id="submit-btn" ref={submitButtonRef}>
                  Request Entry
                </button>
              </form>

              <div className="social-link">
                <a 
                  href="https://www.instagram.com/seedaivision?igsh=MTBjcnpycnFueHpmaw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="Follow SEED on Instagram"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>Follow Us</span>
                </a>
              </div>

              {message && (
                <div className={`message ${submitted ? "success" : ""}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingList;