import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Center } from '@react-three/drei';
import { Loader2 } from 'lucide-react';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} scale={1.44} />
    </Center>
  );
}

function FallbackBox() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="#00FFD1" wireframe opacity={0.5} transparent />
    </mesh>
  );
}

function NeonScene() {
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[0, 10, 5]} intensity={2} color="#ffffff" />
      {/* Neon pink light from bottom left */}
      <spotLight position={[-5, -5, 5]} angle={0.8} penumbra={1} color="#FF007A" intensity={100} distance={20} />
      {/* Neon cyan light from top right */}
      <spotLight position={[5, 5, 5]} angle={0.8} penumbra={1} color="#00FFD1" intensity={100} distance={20} />
      {/* Neon purple from back */}
      <pointLight position={[0, 0, -5]} color="#9D00FF" intensity={80} distance={15} />
      
      <Environment preset="city" environmentIntensity={1.5} />
    </>
  );
}

// Bọc component để xử lý lỗi khi file GLB chưa được tải lên
const ModelWithErrorBoundary = ({ url }: { url: string }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [url]);

  if (hasError) {
    return <FallbackBox />;
  }

  return (
    <ErrorBoundary onError={() => setHasError(true)}>
      <Model url={url} />
    </ErrorBoundary>
  );
};

// Simple Error Boundary logic mapped to state inside a wrapper component
import React from 'react';
class ErrorBoundary extends React.Component<{children: React.ReactNode, onError: () => void}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function PCModelViewer() {
  // ĐƯỜNG DẪN FILE GLB:
  // Bạn hãy đổi tên file 3D của bạn thành `pc-case.glb` và tải lên thư mục dự án (kéo thả vào để ở ngoài cùng /public nếu có, hoặc để ngang hàng thư mục gốc trên web)
  // Sau đó chỉ định URL tương ứng ở đây. Tạm thời mình để mặc định là "/pc-case.glb"
  const modelUrl = '/pc-case.glb';

  return (
    <div className="w-full h-full relative group">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#00FFD1]/20 to-transparent pointer-events-none mix-blend-screen opacity-50 z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FF007A]/20 to-transparent pointer-events-none mix-blend-screen opacity-50 z-10"></div>
      
      <Canvas camera={{ position: [0, 0, 16], fov: 45 }} className="w-full h-full">
        <Suspense fallback={null}>
          <ModelWithErrorBoundary url={modelUrl} />
        </Suspense>
        <NeonScene />
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={3} 
          enableZoom={true} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.5}
        />
      </Canvas>
    </div>
  );
}
