import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepCard from "./../../components/StepCard"
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const Steps = () => {
    const { sectionRef, addToHeadingRefs, addToCardRefs } = useScrollAnimation();
  

  return (
    <div className="py-5" ref={sectionRef}>
      {/* Heading */}
      <div className="d-flex justify-content-center mb-5 mx-2" ref={addToHeadingRefs}>
        <h1 className="text-white text-heading-lg mx-1">
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