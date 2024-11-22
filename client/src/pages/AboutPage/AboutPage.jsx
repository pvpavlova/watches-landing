import React from 'react'

export default function AboutPage() {
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

