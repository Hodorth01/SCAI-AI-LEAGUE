import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { TextureLoader, Mesh, SphereGeometry, MeshStandardMaterial } from "three";

// Initialize TextureLoader
const textureLoader = new TextureLoader();

const TennisBall = ({ position }) => {
  const ballRef = useRef();

  useEffect(() => {
    // GSAP animation for floating effect
    gsap.to(ballRef.current.position, {
      y: position[1] + 1,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
  }, [position]);

  return (
    <mesh ref={ballRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={textureLoader.load("/textures/AdobeStock_145356555.jpeg")} />
    </mesh>
  );
};

export default TennisBall;