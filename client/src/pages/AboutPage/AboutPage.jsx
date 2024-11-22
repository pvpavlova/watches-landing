import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Html } from "@react-three/drei";

const ThreeDModel = () => {
  const { scene } = useGLTF('/digital_watch.glb');
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={[10, 10, 10]} position={[0, 0.2, 0]} />; // Подняли модель на 5 по оси Y
};

export default function App() {
  return (
    <div className="about_page">
      <div>
        <Canvas style={{ height: "100vh", background: "linear-gradient(#1E2022, #738595)" }} camera={{ position: [15, 10, 30], fov: 3 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="studio" background={false} />
          <OrbitControls enableDamping dampingFactor={0.05} enableZoom={false} />
          <ThreeDModel />
        </Canvas>
      </div>
    </div>
  );
}