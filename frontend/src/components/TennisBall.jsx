import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";

const TennisBall = ({ position }) => {
  const ballRef = useRef();
  const [textureLoaded, setTextureLoaded] = useState(false);
  const materialRef = useRef();

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      "./textures/texture.png", 
      (texture) => {
        materialRef.current.map = texture;
        materialRef.current.opacity = 1; // Set higher initial opacity here
        materialRef.current.transparent = true;
        materialRef.current.needsUpdate = true;
        setTextureLoaded(true);
      },
      undefined,
      (err) => console.error("Texture load error:", err)
    );
  }, []);

  useEffect(() => {
    if (!textureLoaded || !ballRef.current) return;

    // Initial state - starts higher opacity now
    ballRef.current.position.set(0, 0, 0);
    materialRef.current.opacity = 1;
    materialRef.current.transparent = true;
    materialRef.current.needsUpdate=true

    // Fade-in animation (now only needs to go from 0.8 to 1.0)
    gsap.to(materialRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    });

    // Rest of animations remain EXACTLY the same
    gsap.from(ballRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.5)",
      delay: 0.2
    });

    gsap.to(ballRef.current.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1.2,
      ease: "power3.out",
      delay: 0.5
    });

    const floatingAnimation = gsap.to(ballRef.current.position, {
      y: position[1] + Math.random() * 0.5,
      x: position[0] + Math.random() * 0.3,
      z: position[2] + Math.random() * 0.7,
      duration: 2 + Math.random() * 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 1.5
    });

    const rotationAnimation = gsap.to(ballRef.current.rotation, {
      y: Math.PI * 2,
      duration: 15 + Math.random() * 5,
      repeat: -1,
      ease: "linear",
      delay: 1
    });

    return () => {
      floatingAnimation.kill();
      rotationAnimation.kill();
    };
  }, [position, textureLoaded]);

  return (
    <mesh ref={ballRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        opacity={0} 
        transparent={true}
      />
    </mesh>
  );
};

export default TennisBall;