import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function VillaModel() {
  const modelRef = useRef(null);

  useFrame((state) => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y = -0.42 + Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
    modelRef.current.position.y = -0.2 + Math.sin(state.clock.elapsedTime * 0.7) * 0.05;
  });

  return (
    <group ref={modelRef} position={[0, -0.2, 0]} scale={1.42}>
      <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[3.3, 0.9, 2.2]} />
        <meshStandardMaterial color="#efe7db" roughness={0.78} metalness={0.03} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 0.62, 0]}>
        <boxGeometry args={[3.0, 0.18, 2.0]} />
        <meshStandardMaterial color="#d8c6a3" roughness={0.45} metalness={0.05} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 1.05, 0.2]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.85, 1.1, 4]} />
        <meshStandardMaterial color="#8a6f4d" roughness={0.68} metalness={0.02} />
      </mesh>
      <mesh castShadow position={[0, 0.25, 1.13]}>
        <boxGeometry args={[1.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#cdd6dd" roughness={0.12} metalness={0.22} transparent opacity={0.88} />
      </mesh>
      <mesh castShadow position={[-0.95, 0.2, 1.13]}>
        <boxGeometry args={[0.52, 0.68, 0.08]} />
        <meshStandardMaterial color="#c9b79c" roughness={0.24} metalness={0.12} />
      </mesh>
      <mesh castShadow position={[0.95, 0.2, 1.13]}>
        <boxGeometry args={[0.52, 0.68, 0.08]} />
        <meshStandardMaterial color="#c9b79c" roughness={0.24} metalness={0.12} />
      </mesh>
      <mesh castShadow position={[0.02, -0.45, 1.13]}>
        <boxGeometry args={[0.6, 0.95, 0.06]} />
        <meshStandardMaterial color="#1f2933" roughness={0.18} metalness={0.18} />
      </mesh>
      <mesh castShadow position={[0, -0.65, 0]}>
        <boxGeometry args={[4.4, 0.15, 2.8]} />
        <meshStandardMaterial color="#b08d57" roughness={0.96} metalness={0.02} />
      </mesh>
    </group>
  );
}

export default function Villa3D({ className = '', compact = false, fallbackImage }) {
  const [canRender, setCanRender] = useState(true);
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const shouldFallback =
      window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanRender(!shouldFallback);
  }, []);

  useEffect(() => {
    if (!canRender) return undefined;
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [canRender, ref]);

  if (!canRender) {
    return (
      <div
        className={`relative overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(248,245,239,0.96))] shadow-luxe ${className}`}
        style={{
          backgroundImage: fallbackImage
            ? `linear-gradient(180deg, rgba(255,255,255,0.12), rgba(248,245,239,0.9)), url(${fallbackImage})`
            : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: compact ? 300 : 520,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(176,141,87,0.18),transparent_55%)]" />
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/70 p-4 text-xs uppercase tracking-[0.35em] text-charcoal/70 backdrop-blur-md">
          3D preview optimized for mobile
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/70 bg-white/50 shadow-luxe ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(176,141,87,0.18),transparent_42%)]" />
      {inView ? (
        <Canvas
          className="absolute inset-0 h-full w-full"
          dpr={[1, 1.25]}
          frameloop="always"
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          shadows
          camera={{ position: [4.2, 2.35, 5.2], fov: 30 }}
        >
          <ambientLight intensity={1.35} />
          <directionalLight position={[3, 5, 2]} intensity={1.8} castShadow />
          <directionalLight position={[-3, 2, -2]} intensity={0.45} color="#e6eef5" />
          <Suspense fallback={null}>
            <group position={[0, -0.15, 0]}>
              <VillaModel />
            </group>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.78, 0]}>
              <circleGeometry args={[4.2, 64]} />
              <shadowMaterial transparent opacity={0.18} />
            </mesh>
          </Suspense>
        </Canvas>
      ) : (
        <div
          className="h-full min-h-[360px] w-full"
          style={{
            backgroundImage: fallbackImage
              ? `linear-gradient(180deg, rgba(255,255,255,0.08), rgba(248,245,239,0.92)), url(${fallbackImage})`
              : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
    </div>
  );
}
