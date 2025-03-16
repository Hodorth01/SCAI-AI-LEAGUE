import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import TennisBall from "../components/TennisBall ";
 const Home = ()=>{
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
            opacity:1,
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
            <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
              {/* Floating Spheres */}
                <TennisBall position={[-2, 1, 0]} />
                <TennisBall position={[2, -1, 0]} />
                <TennisBall position={[0, 2, -5]} />
      
              <OrbitControls enableZoom={false} autoRotate />
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
                <div ref={buttonRef} className="d-flex gap-3">
                    <div style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10, borderRadius: 2, outline: '3px #501F8B solid', outlineOffset: '-3px', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: 'white', fontSize: 17, fontFamily: 'Poppins', fontWeight: '400', textTransform: 'uppercase', letterSpacing: 2.46, wordWrap: 'break-word'}}>GET IN TOUCH</div>
                    </div>
                </div>
            </div>
        </div>
    )
 }


 export default Home