import { useState , useRef , useEffect } from "react"
import {useLogin} from "../hooks/useLogin"
const Login = () => {
    const { login , error , isLoading} = useLogin()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(userName, password)
    }

      const wrapperRef = useRef(null);

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
                Welcome back to <span className="colordText">SEED</span>
                </h1>
                <p>
                Whether you're refining your serve or mastering your footwork, your performance data is here, ready to help you level up
                </p>
                <div className="accent-line"></div>
              </div>
  
              <div className="form-column">
                <form
                  className="waitlist-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        className={`form-input ${userName ? "invalid" : ""}`}
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                      />
                    </div>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={`form-input ${password ? "invalid" : ""}`}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {formErrors.password && (
                      <div className="error-message">{password}</div>
                    )}
                  </div>
                  <button disabled={isLoading} id="submit-btn" type="submit">Log in</button>
                {error && <div className="error">{error}</div>}

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
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Login