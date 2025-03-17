import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import TennisBall from "../../components/TennisBall";
import Border from "../../components/Border";
const Intro = () => {
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // GSAP animations for text and buttons
    gsap.from(headlineRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(subheadlineRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      delay: 1,
      ease: "power3.out",
    });

    gsap.from(buttonRef.current, {
      opacity: 1,
      y: 50,
      duration: 1,
      delay: 1.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="hero-section">
      {/* 3D Canvas */}
      <Canvas className="canvas" camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />

        {/* Floating Tennis Balls */}
        <TennisBall position={[-2, 1, 0]} /> {/* Left side, mid-depth */}
        <TennisBall position={[1.5, -1, 1]} /> {/* Right side, further back */}
        <TennisBall position={[1.5, 1.5, -2]} /> {/* Center, closer to the camera */}
      </Canvas>

      {/* Hero Content */}
      <div className="hero-content">
        <h1 ref={headlineRef} className="display-3 fw-bold">
          A new way of playing Sports
        </h1>
        <p ref={subheadlineRef} className="lead">
          Every serve, volley, and stroke is tracked to elevate player performance,
          enhance fan engagement, and empower officials with precise data for
          fairer and more informed decisions.
        </p>
      {/* Button with Rotating Border Animation */}
        <div ref={buttonRef} className="d-flex gap-3">
          <Border>
            <div
              style={{
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 10,
                paddingBottom: 10,
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 17,
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  textTransform: "uppercase",
                  letterSpacing: 2.46,
                  wordWrap: "break-word",
                }}
                className="btn p-0"
              >
                GET IN TOUCH
              </div>
            </div>
          </Border>
        </div>
      </div>
    </div>
  );
};

export default Intro;