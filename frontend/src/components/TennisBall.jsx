import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TextureLoader } from "three";

// Initialize TextureLoader
const textureLoader = new TextureLoader();

const TennisBall = ({ position }) => {
  const ballRef = useRef();

  useEffect(() => {
    // Randomize the floating animation for each ball
    const floatingAnimation = gsap.to(ballRef.current.position, {
      y: position[1] + Math.random() * 0.2, // Randomize vertical movement
      x: position[0] + Math.random() * 0.2, // Randomize horizontal movement
      z: position[2] + Math.random() * 0.2, // Randomize depth movement
      duration: 3 + Math.random() * 2, // Randomize duration for organic feel
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    return () => {
      floatingAnimation.kill(); // Clean up animation on unmount
    };
  }, [position]);

  return (
    <mesh ref={ballRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} /> {/* Smaller size for better spacing */}
      <meshStandardMaterial map={textureLoader.load("/textures/AdobeStock_145356555.jpeg")} />
    </mesh>
  );
};

export default TennisBall;