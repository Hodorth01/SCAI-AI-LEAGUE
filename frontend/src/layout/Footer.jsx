import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const dividerRef = useRef(null);
  const navRef = useRef(null);
  const descriptionRef = useRef(null);
  const socialRef = useRef(null);
  const copyrightRef = useRef(null);

  useEffect(() => {
    // Set initial state (hidden)
    gsap.set([
      logoRef.current,
      dividerRef.current,
      navRef.current,
      descriptionRef.current,
      socialRef.current,
      copyrightRef.current
    ], {
      opacity: 0,
      y: 30
    });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
        markers: false
      }
    });

    // Staggered animations
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(dividerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.5")
    .to(navRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.3")
    .to(socialRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")
    .to(copyrightRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.1");

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="container">
        {/* Logo section */}
        <div className="row justify-content-center mb-4" ref={logoRef}>
          <div className="col-12 text-center">
            <h1 className="footer-logo mb-2">SEED</h1>
            <p className="footer-tagline">A NEW ERA OF SPORTS</p>
          </div>
        </div>

        {/* Divider line */}
        <div className="row justify-content-center mb-4" ref={dividerRef}>
          <div className="col-auto">
            <div className="footer-divider"></div>
          </div>
        </div>

        {/* Navigation */}
        <div className="row justify-content-center mb-4" ref={navRef}>
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
        <div className="row justify-content-center mb-4" ref={descriptionRef}>
          <div className="col-md-8 text-center">
            <p className="footer-description">
              Lorem ipsum Neque porro quisquam est qui do lorem ipsum quia dolor sit amet, Neque porro elit NeDque
            </p>
          </div>
        </div>

        {/* Social icons */}
        <div className="row justify-content-center mb-4" ref={socialRef}>
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
        <div className="row justify-content-center" ref={copyrightRef}>
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