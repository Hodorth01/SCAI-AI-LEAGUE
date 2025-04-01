import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "../../components/ServiceCard";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const headingRefs = useRef([]);
  const textRefs = useRef([]);
  const cardRefs = useRef([]);

  // Store refs with initial hidden state
  const addToHeadingRefs = (el) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
      gsap.set(el, { opacity: 0, y: 30 });
    }
  };

  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
      gsap.set(el, { opacity: 0, y: 20 });
    }
  };

  const addToCardRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
      gsap.set(el, { opacity: 0, y: 40 });
    }
  };

  useEffect(() => {
    const createAnimations = () => {
      const isMobile = window.innerWidth < 768;
      
      // Kill any existing animations
      ScrollTrigger.getAll().forEach(t => t.kill());
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 85%" : "top 75%",
          toggleActions: "play none none none"
        }
      });

      // Text content animations
      tl.to(headingRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });

      tl.to(textRefs.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5");

      // Cards animation - sequential with 0.3s delay between each
      cardRefs.current.forEach((card, index) => {
        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "back.out(1.2)"
        }, `+=${index * 0.05}`); // Each card starts 0.3s after previous
      });
    };

    // Initialize animations
    createAnimations();

    // Recreate animations on resize
    const handleResize = () => {
      createAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="container py-5" ref={sectionRef}>
      <div className="row">
        {/* Left Column - Text Content */}
        <div className="col-12 col-xl-6 mb-5 mb-xl-0">
          <div className="d-flex flex-column h-100">
            <div className="d-inline-block" ref={addToHeadingRefs}>
              <div className="colordText text-label">
                our services
              </div>
            </div>
            <h1 className="text-white text-heading-lg mb-3" ref={addToHeadingRefs}>
              Unlock Your Game with <span className="colordText">SEED</span> Insights
            </h1>
            <p className="text-white text-body-lg mb-4" ref={addToTextRefs}>
              From grassroots to grand slams, SEED isn't just tracking tennis—we're rewriting how it's played, watched, and judged. Ready to play smarter?
            </p>
          </div>
        </div>

        {/* Right Column - Cards */}
        <div className="col-12 col-xl-6">
          <div className="row justify-content-start gx-4 gy-4">
            {/* First row of cards */}
            <div className="col-12 d-flex flex-wrap justify-content-xl-start justify-content-center">
              <div className="mx-2 mb-4" ref={addToCardRefs}>
                <ServiceCard
                  icon="./icons/heatmaps.png"
                  title="heatmaps" 
                  description="Visualize a player's positioning and activity on the field."
                />
              </div>
              <div className="mx-2 mb-4" ref={addToCardRefs}>
                <ServiceCard
                  icon="./icons/speed.png"
                  title="Speed" 
                  description="Tracks a player's pace during matches."
                />                            
              </div>
            </div>
            {/* Second row of cards */}
            <div className="col-12 d-flex flex-wrap justify-content-xl-start justify-content-center">
              <div className="mx-2 mb-4" ref={addToCardRefs}>
                <ServiceCard
                  icon="./icons/ux.png"
                  title="insights" 
                  description="Evaluates past performances to identify trends and patterns."
                />                                
              </div>
              <div className="mx-2 mb-4" ref={addToCardRefs}>
                <ServiceCard
                  icon="./icons/shot.png"
                  title="shot placements" 
                  description="Visualize a player's shot accuracy on the field and learn new patterns."
                />                                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;