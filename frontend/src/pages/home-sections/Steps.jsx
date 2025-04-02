import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepCard from "./../../components/StepCard"
const Steps = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  // Improved ref collection with mobile-ready initial state
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
      gsap.set(el, { 
        opacity: 0, 
        y: 30,
        visibility: "visible" // Ensures elements are render-visible
      });
    }
  };

  useEffect(() => {
    // Mobile-responsive setup
    const isMobile = window.innerWidth < 768;
    
    gsap.set(headingRef.current, { 
      opacity: 0, 
      y: 30 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: isMobile ? "top 90%" : "top 80%", // Higher trigger on mobile
        toggleActions: "play none none none",
        markers: false, // Enable to debug
        invalidateOnRefresh: true // Important for mobile rotation
      }
    });

    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // More reliable mobile animation - sequential instead of stagger
    cardRefs.current.forEach((card, i) => {
      tl.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.2)"
      }, `+=${i * 0.1}`); // 0.1s between each card
    });

    // Handle resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
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