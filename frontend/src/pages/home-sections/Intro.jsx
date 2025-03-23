import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { gsap } from "gsap";
import TennisBall from "../../components/TennisBall";
import Border from "../../components/Border";
import CubicText from "../../components/CubicText";

const Intro = () => {
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // GSAP animations for text and buttons
    gsap.from(headlineRef.current, {
      opacity: 1, // Start invisible
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(subheadlineRef.current, {
      opacity: 1, // Start invisible
      y: 50,
      duration: 1,
      delay: 1,
      ease: "power3.out",
    });

    gsap.from(buttonRef.current, {
      opacity: 1, // Start invisible
      y: 50,
      duration: 1,
      delay: 1.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="hero-section">
      {/* 3D Canvas */}
      <Canvas className="canvas mb-5" camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />

        {/* Floating Tennis Balls */}
        <TennisBall position={[-2, 1, 0]} /> {/* Left side, mid-depth */}
        <TennisBall position={[1.5, -1, 1]} /> {/* Right side, further back */}
        <TennisBall position={[1.5, 1.5, -2]} /> {/* Center, closer to the camera */}

        {/* Cubic Text */}
        <CubicText texts={["playing", "Analyzing", "mastering", "Analyzing"]} faceDuration={2} />

        {/* Optional: Add Stars for a space-like background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>

      {/* Hero Content */}
      <div className="hero-content mt-5 pt-5 w-100">
      <div className = "mt-5 mb-5 mx-3 " style={{width: "100%", height: 0, outline: '1px #732ACB solid' , justifySelf:"center", maxWidth:"800px"}}></div>
      
        <p ref={subheadlineRef} className="lead">
          Unleash your A-Game!
          <br/>
          See it. SEED it. Smash it!
        </p>
        


      </div>
    </div>
  );
};

export default Intro;