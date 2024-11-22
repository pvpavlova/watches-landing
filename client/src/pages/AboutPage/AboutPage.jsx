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
    <Canvas style={{ height: "100vh", background: "#1E2022" }}   camera={{ position: [15, 5, 30], fov: 3 }} >
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="studio" background={false} />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05} 
        enableZoom={false} 
      />
      <ThreeDModel />
    </Canvas>
  );
}