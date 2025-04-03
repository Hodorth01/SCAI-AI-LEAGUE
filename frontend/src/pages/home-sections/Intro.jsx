import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import TennisBall from "../../components/TennisBall";
import CubicText from "../../components/CubicText";

const Intro = ({ aboutRef }) => {
  return (
    <div className="hero-section">
      {/* 3D Canvas */}
      <Canvas className="canvas mb-5 pb-5" camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />

        {/* Floating Tennis Balls */}
        <TennisBall position={[-2, 1, 0]} /> {/* Left side, mid-depth */}
        <TennisBall position={[1.5, -1, 1]} /> {/* Right side, further back */}
        <TennisBall position={[1.5, 1.5, -2]} /> {/* Center, closer to the camera */}

        {/* Cubic Text */}
        <CubicText
          texts={["playing", "Analyzing", "mastering", "Analyzing"]}
          faceDuration={2}
          aboutRef={aboutRef} // Pass aboutRef to CubicText
        />

        {/* Optional: Add Stars for a space-like background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>

      {/* Hero Content */}
      <div className="hero-content mt-5 pt-5 w-100">
        <div class="mt-5 mb-5 mx-3 d-flex justify-content-center">
          <div class="line"></div>
        </div>        
        <p className="lead mt-3 pt-4">
          Unleash your A-Game!
          <br />
          See it. <strong className="colordText">SEED</strong>  it. Smash it!
        </p>
      </div>
    </div>
  );
};

export default Intro;