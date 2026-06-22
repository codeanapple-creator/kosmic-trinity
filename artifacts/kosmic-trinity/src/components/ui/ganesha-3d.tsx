import { Suspense, useRef, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import ganeshaImg from "../../assets/bodhi_nobg.png";

/* ── WebGL availability check ──────────────────────────── */
function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ── Error boundary so a WebGL crash doesn't kill the page */
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { errored: boolean }
> {
  state = { errored: false };
  static getDerivedStateFromError() {
    return { errored: true };
  }
  render() {
    return this.state.errored ? this.props.fallback : this.props.children;
  }
}

/* ── Preload only when WebGL is likely available ─────────── */
if (typeof window !== "undefined" && hasWebGL()) {
  useGLTF.preload("/bodhi.glb");
}

/* ── The 3-D dancing Ganesha mesh ───────────────────────── */
function BodhiModel() {
  const { scene } = useGLTF("/bodhi.glb");
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(t * 0.7) * 0.38;
    groupRef.current.position.y = Math.sin(t * 1.4) * 0.09 - 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.06;
  });

  return (
    <group ref={groupRef} scale={[0.72, 0.72, 0.72]} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

/* ── PNG fallback (chat avatars or no-WebGL environments) ── */
function BodhiImage({ size, round }: { size: number; round?: boolean }) {
  return (
    <img
      src={ganeshaImg}
      alt="Bodhi"
      draggable={false}
      style={{
        width: size,
        height: size,
        objectFit: round ? "cover" : "contain",
        borderRadius: round ? "50%" : 0,
        background: "transparent",
        animation: "bodhi-dance 2.4s ease-in-out infinite",
        transformOrigin: "bottom center",
        filter: round ? "none" : "drop-shadow(0 8px 18px rgba(201,168,76,0.45))",
      }}
    />
  );
}

/* ── Public component ───────────────────────────────────── */
export function Ganesha3D({ size = 120 }: { size?: number }) {
  const isSmall = size < 36;

  /* Tiny avatars in chat messages: PNG clipped to circle */
  if (isSmall) return <BodhiImage size={size} round />;

  /* Check WebGL at render time — fall back instantly if unavailable */
  if (typeof window === "undefined" || !hasWebGL()) {
    return <BodhiImage size={size} />;
  }

  const fallback = <BodhiImage size={size} />;

  return (
    <ModelErrorBoundary fallback={fallback}>
      {/* No border-radius, no overflow:hidden — character floats freely */}
      <div style={{ width: size, height: size, background: "transparent" }}>
        <Canvas
          style={{ width: "100%", height: "100%" }}
          camera={{ position: [0, 0.15, 2.2], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.4} />
          <directionalLight position={[3, 6, 4]} intensity={2.2} castShadow />
          <directionalLight position={[-2, 3, -2]} intensity={0.5} color="#C9A84C" />
          <Suspense fallback={null}>
            <BodhiModel />
            <ContactShadows
              position={[0, -0.62, 0]}
              opacity={0.35}
              scale={2}
              blur={1.5}
              far={1}
            />
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      </div>
    </ModelErrorBoundary>
  );
}
