import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepCard from "../../components/StepCard";

gsap.registerPlugin(ScrollTrigger);

const Steps = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  // Store card refs with initial state
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
      gsap.set(el, { opacity: 0, y: 50 });
    }
  };

  useEffect(() => {
    const createAnimations = () => {
      const isMobile = window.innerWidth < 768;
      
      // Kill any existing triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Set initial state for heading if not already set
      gsap.set(headingRef.current, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 90%" : "top 80%",
          toggleActions: "play none none none",
          markers: false // Set to true to debug trigger position
        }
      });

      // Heading animation
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Cards animation - sequential with small stagger
      cardRefs.current.forEach((card, index) => {
        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.2)"
        }, `+=${index * 0.1}`); // Each card starts 0.1s after previous
      });
    };

    // Initialize animations
    createAnimations();

    // Handle resize
    const handleResize = () => {
      createAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="py-5" ref={sectionRef}>
      {/* Heading */}
      <div className="d-flex justify-content-center mb-5" ref={headingRef}>
        <h1 className="text-white text-heading-lg">
          <span className="colordText">Master </span>
          In Three Steps!
        </h1>
      </div>
      
      {/* Cards Container */}
      <div className="steps-container row justify-content-center w-100 mx-0">
        <div className="row">
          {/* Card 1 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-4" ref={addToCardRefs}>
            <StepCard icon="./icons/checkIn.png" title="1. Check in"/>
          </div>
          
          {/* Card 2 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-4" ref={addToCardRefs}>
            <StepCard icon="./icons/play.png" title="2. Play"/>
          </div>
          
          {/* Card 3 */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-4" ref={addToCardRefs}>
            <StepCard icon="./icons/thrive.png" title="3. Thrive!"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Steps;