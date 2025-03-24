import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./home-sections/Intro";
import About from "./home-sections/About";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const introRef = useRef(null);
  const aboutRef = useRef(null);
  const backgroundLayerRef = useRef(null);
  const foregroundLayerRef = useRef(null);

  useEffect(() => {
    // Move the About section up to cover the Intro section
    gsap.to(aboutRef.current, {
      y: "-100vh", // Move the About section up by 100% of the viewport height
      ease: "power2.out", // Faster at the beginning, slower at the end
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom", // Start animation when the top of the About section hits the bottom of the viewport
        end: "bottom top", // End animation when the bottom of the About section hits the top of the viewport
        scrub: 2, // Slower scrolling (higher value = smoother and slower)
      },
    });
  
    // Parallax effect for the background layer (moves slower)
    gsap.to(backgroundLayerRef.current, {
      y: "-50vh", // Move the background up by 50% of the viewport height
      ease: "power2.out", // Faster at the beginning, slower at the end
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Slightly slower than the About section
      },
    });
  
    // Parallax effect for the foreground layer (moves faster)
    gsap.to(foregroundLayerRef.current, {
      y: "-150vh", // Move the foreground up by 150% of the viewport height
      ease: "power2.out", // Faster at the beginning, slower at the end
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Slightly slower than the About section
      },
    });
  }, []);

  return (
    <div>
      {/* Intro Section */}
      <div ref={introRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 0 }}>
        <Intro />
      </div>

      {/* About Section with Parallax Effect */}
      <div ref={aboutRef} style={{ position: "relative", marginTop: "100vh" }}>
        <About ref={{ backgroundLayerRef, foregroundLayerRef }} />
      </div>

    </div>
  );
};

export default Home;