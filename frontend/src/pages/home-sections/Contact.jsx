import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Border from '../../components/Border';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';


const Contact = () => {
  const { sectionRef, addToHeadingRefs, addToTextRefs, addToCardRefs } = useScrollAnimation();


  return (
    <div className="container my-5" ref={sectionRef}>
      <div className="row justify-content-end">
        {/* Left Content - Contact Info */}
        <div className="col-lg-6 my-5">
          <div className='contact-title' ref={addToHeadingRefs}>
            <span style={{
              color: 'white', 
              fontSize: '48px', 
              fontFamily: 'Poppins', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              wordWrap: 'break-word'
            }}>
              GET IN {" "}
            </span>
            <span className='colordText' style={{
              color: '#732ACB', 
              fontSize: '48px', 
              fontFamily: 'Poppins', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              wordWrap: 'break-word'
            }}>
              TOUCH 
            </span>
          </div>
          <div className="mt-4 icons-holder text-white">
            <div className="mb-3" ref={addToTextRefs}>
              <i className="bi bi-geo-alt-fill me-2 icon"></i> Jeddah, Saudi Arabia
            </div>
            <div className="mb-3" ref={addToTextRefs}>
              <i className="bi bi-telephone-fill me-2 icon"></i> (+966) 55 999 9999
            </div>
            <div ref={addToTextRefs}>
              <i className="bi bi-envelope-fill me-2 icon"></i> seed.al.ksa@gmail.com
            </div>
          </div>
        </div>
            {/* Right Content - Contact Form */}
        <div className="col-lg-6 my-5" ref={addToCardRefs}>
          <form className='p-5 py-3 contact-form'>
            <div className="row text-white">
              <div className="col-md-12">
                <label htmlFor="name" className="form-label">YOUR NAME</label>
                <input 
                  type="text" 
                  className="form-control my-2 rounded-0 bg-transparent text-white" 
                  id="name" 
                  name="name" 
                  required 
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="email" className="form-label">YOUR EMAIL</label>
                <input 
                  type="text" 
                  className="form-control my-2 rounded-0 bg-transparent text-white" 
                  id="email" 
                  name="email" 
                  required 
                />
              </div>
              <div className="col-12">
                <label htmlFor="message" className="form-label">YOUR MESSAGE</label>
                <textarea 
                  className="form-control my-2 rounded-0 bg-transparent text-white" 
                  id="message" 
                  name="message" 
                  rows="8" 
                  required
                ></textarea>
              </div>
              <div className="col-12 my-2">
                <div className="row w-100">
                  <div className="d-flex justify-content-center">
                    <Border>
                      <button 
                        type="submit" 
                        className="btn btn-transparent p-1 text-white fs-6"
                      >
                        SEND MESSAGE
                      </button>
                    </Border>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;