import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TextureLoader } from "three";

// Initialize TextureLoader
const textureLoader = new TextureLoader();

const TennisBall = ({ position }) => {
  const ballRef = useRef();

  useEffect(() => {
    // Set initial position
    ballRef.current.position.set(0, 1, 0);

    // Scale-up animation
    gsap.from(ballRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2,
      ease: "elastic.out(1, 0.5)",
    });

    // Move to the original position
    gsap.to(ballRef.current.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5, // Delay to sync with the scale animation
    });

    // Randomize the floating animation for each ball
    const floatingAnimation = gsap.to(ballRef.current.position, {
      y: position[1] + Math.random() * 0.5, // Randomize vertical movement
      x: position[0] + Math.random() * 0.3, // Randomize horizontal movement
      z: position[2] + Math.random() * 0.7, // Randomize depth movement
      duration: 2 + Math.random() * 4, // Randomize duration for organic feel
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2, // Delay to start after the initial animations
    });

    // Rotate the ball continuously
    const rotationAnimation = gsap.to(ballRef.current.rotation, {
      y: Math.PI * 2, // Rotate 360 degrees (in radians)
      duration: 15 + Math.random() * 5, // Randomize rotation speed
      repeat: -1, // Infinite loop
      ease: "linear", // Smooth rotation
    });

    return () => {
      floatingAnimation.kill(); // Clean up floating animation
      rotationAnimation.kill(); // Clean up rotation animation
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