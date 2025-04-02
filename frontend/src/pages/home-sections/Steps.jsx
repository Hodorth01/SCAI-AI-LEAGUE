import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepCard from "../../components/StepCard";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Steps = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  // Store card refs
  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Set initial state (hidden and positioned)
    gsap.set([headingRef.current, ...cardRefs.current], {
      opacity: 0,
      y: 50,
      // Ensure elements are visible to ScrollTrigger
      visibility: "visible"
    });

    // Create a media query condition
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      // Desktop animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          markers: false
        }
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      tl.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.2)"
      }, "-=0.5");
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile animations - more aggressive trigger point
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%", // Higher percentage for mobile
          end: "bottom 10%",
          toggleActions: "play none none none",
          markers: false
        }
      });

      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      tl.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1, // Smaller stagger on mobile
        ease: "back.out(1.2)"
      }, "-=0.5");
    });

    return () => {
      mm.revert(); // cleanup
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