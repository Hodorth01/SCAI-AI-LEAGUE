import React, { useRef, useEffect, useState } from "react";
import { Html } from "@react-three/drei";
import { gsap } from "gsap";

function CubicText({ texts, faceDuration = 2 }) {
  const cubeRef = useRef();
  const [visibleFace, setVisibleFace] = useState(0); // Track the currently visible face

  // Flip animation
  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 }); // Infinite loop

    // Face 1 visible for 2 seconds
    timeline.to(cubeRef.current.rotation, {
      x: 0, // Face 1 (front)
      duration: 0, // Instant transition
      onStart: () => setVisibleFace(0), // Set visible face to 0
    });
    timeline.to({}, { duration: faceDuration }); // Pause for 2 seconds

    // Flip to Face 2
    timeline.to(cubeRef.current.rotation, {
      x: Math.PI / 2, // Face 2 (90 degrees)
      duration: 1, // Flip duration
      ease: "power3.inOut",
      onStart: () => setVisibleFace(1), // Set visible face to 1
    });
    timeline.to({}, { duration: faceDuration }); // Pause for 2 seconds

    // Flip to Face 3
    timeline.to(cubeRef.current.rotation, {
      x: Math.PI, // Face 3 (180 degrees)
      duration: 1, // Flip duration
      ease: "power3.inOut",
      onStart: () => setVisibleFace(2), // Set visible face to 2
    });
    timeline.to({}, { duration: faceDuration }); // Pause for 2 seconds

    // Flip to Face 4
    timeline.to(cubeRef.current.rotation, {
      x: (3 * Math.PI) / 2, // Face 4 (270 degrees)
      duration: 1, // Flip duration
      ease: "power3.inOut",
      onStart: () => setVisibleFace(3), // Set visible face to 3
    });
    timeline.to({}, { duration: faceDuration }); // Pause for 2 seconds

    // Flip back to Face 1
    timeline.to(cubeRef.current.rotation, {
      x: Math.PI * 2, // Face 1 (360 degrees)
      duration: 1, // Flip duration
      ease: "power3.inOut",
      onStart: () => setVisibleFace(0), // Set visible face to 0
    });

    return () => {
      timeline.kill(); // Clean up the timeline on unmount
    };
  }, [faceDuration]);

  return (
    <group>
      {/* Fixed Text: "A new way of" (First Line) */}
      <Html
        position={[0, 1.7, 0]}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: "translate(-50%, -50%)", // Center the text
        }}
      >
        <p 
          className="introText"
          style={{
            color: "white",
            fontSize: "2.3rem",
            textAlign: "center",
            whiteSpace: "nowrap", // Prevent text from wrapping
          }}
        >
          A NEW WAY OF
        </p>
      </Html>

      {/* Cubic Text (Second Line) */}
      <mesh ref={cubeRef} position={[0, 1, 0]} scale={[0.6, 0.6, 0.6]}> {/* Smaller cube */}
        <boxGeometry args={[1, 1, 1]} /> {/* Cube size */}
        <meshStandardMaterial transparent opacity={0} /> {/* Make the cube transparent */}

        {/* Face 1 (Front) */}
        <Html position={[0, 0, 1.01]} transform>
          <div
          className="cubicText colordText introText"
            style={{
              opacity: visibleFace === 0 ? 1 : 0 // Show only if visibleFace is 0

            }}
          >
            {texts[0]}
          </div>
        </Html>

        {/* Face 2 (Top) */}
        <Html position={[0, 1.01, 0]} transform rotation={[Math.PI / 2, 0, 0]}>
        <div
          className="cubicText colordText introText"
            style={{
              opacity: visibleFace === 1 ? 1 : 0, // Show only if visibleFace is 0
              transform: "rotateX(180deg)"

            }}
          >
            {texts[1]}
          </div>
        </Html>

        {/* Face 3 (Back) */}
        <Html position={[0, 0, -1.01]} transform rotation={[0, 0, Math.PI]}>
        <div
          className="cubicText colordText introText"
            style={{
              opacity: visibleFace === 2 ? 1 : 0, // Show only if visibleFace is 0
              transform: "rotateY(180deg)"

            }}
          >
            {texts[2]}
          </div>
        </Html>

        {/* Face 4 (Bottom) */}
        <Html position={[0, -1.01, 0]} transform rotation={[-Math.PI / 2, 0, 0]}>
        <div
          className="cubicText colordText introText"
            style={{
              opacity: visibleFace === 3 ? 1 : 0, // Show only if visibleFace is 0
              transform: "rotateX(180deg)"

            }}
          >
            {texts[3]}
          </div>
        </Html>
      </mesh>

      {/* Fixed Text: "Sports" (Third Line) */}
      <Html position={[0, 0.3, 0]}>
        <h4 className="introText" style={{ color: "white", fontSize: "2rem", textAlign: "center", transform: "translate(-50%, -50%)" }}>
          SPORTS
        </h4>
      </Html>
    </group>
  );
}

export default CubicText;