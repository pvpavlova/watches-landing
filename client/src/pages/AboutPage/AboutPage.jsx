import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

const ThreeDModel = () => {
  const { scene } = useGLTF('/digital_watch.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; 
    }
  });

  return <primitive ref={modelRef} object={scene} scale={[10, 10, 10]} />;
};

export default function App() {
  return (
    <Canvas
      style={{ height: "100vh", background: "linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)"}}
    >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="apartment" background={false} />
      <OrbitControls enableDamping dampingFactor={0.05} />
        <ThreeDModel />
    </Canvas>
  );
}