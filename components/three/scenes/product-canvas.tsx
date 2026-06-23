"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Lightformer, OrbitControls, AdaptiveDpr } from "@react-three/drei"
import { FittedModel } from "@/components/three/fitted-model"
import { useFinePointer } from "@/lib/use-fine-pointer"

/** Compact, draggable product viewer for the collection cards. */
export default function ProductCanvas({ url }: { url: string }) {
  const fine = useFinePointer()
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.4], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[2, 3, 4]} intensity={2.1} color="#ece9ff" />
      <Environment resolution={128}>
        <Lightformer intensity={2.2} color="#a99aff" position={[-3, 2, 3]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.4} color="#ffffff" position={[3, 1, 2]} scale={[5, 5, 1]} />
        <Lightformer intensity={1} color="#5b3fb0" position={[0, -3, -2]} scale={[7, 5, 1]} />
      </Environment>

      <Suspense fallback={null}>
        <FittedModel url={url} target={2.3} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={fine}
        autoRotate
        autoRotateSpeed={1.4}
        minPolarAngle={Math.PI / 2.6}
        maxPolarAngle={Math.PI / 1.7}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
