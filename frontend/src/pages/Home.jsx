import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Intro from "./home-sections/Intro";
import About from "./home-sections/About";
import Services from "./home-sections/Services";
import Steps from "./home-sections/Steps";
import Contact from "./home-sections/Contact";
import Footer from "../layout/Footer";
// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const introRef = useRef(null); // Ref for the Intro section
  const aboutRef = useRef(null); // Ref for the About section



  return (
    <div>
      {/* Intro Section */}
      <section className="intro-section"
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
        <Intro aboutRef={aboutRef} />
      </section>

      {/* About Section */}
      <div className = "parallax-layer">
        <section className="about-section pt-3" id="about" ref={aboutRef} >
          <About />
        </section>
        <section className="services-section" id="services">
          <Services/>
        </section>
        <section className="Steps-section" >
          <Steps/>
        </section>
        <section className="contact-section" id="contact">
          <Contact/>
        </section>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;