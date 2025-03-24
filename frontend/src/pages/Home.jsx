import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./home-sections/Intro";
import About from "./home-sections/About";
import Services from "./home-sections/Services";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const introRef = useRef(null); // Ref for the Intro section
  const aboutRef = useRef(null); // Ref for the About section



  return (
    <div>
      {/* Intro Section */}
      <div
        ref={introRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <Intro aboutRef={aboutRef} /> {/* Pass aboutRef to Intro */}
      </div>

      {/* About Section */}
      <section className = "about-section" ref={aboutRef} style={{ position: "relative", marginTop: "100vh" }}>
        <About />
      </section>
      {/* <section>
        <Services/>
      </section> */}
    </div>
  );
};

export default Home;