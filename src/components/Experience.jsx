import {
  Cylinder,
  MeshReflectorMaterial,
  OrbitControls,
  Text,
} from "@react-three/drei";
import {
  CuboidCollider,
  CylinderCollider,
  RigidBody,
} from "@react-three/rapier";
import { useGameStore } from "../store";
import { CharacterController } from "./CharacterController";
import { KanaSpots } from "./KanaSpots";
import { Kicker } from "./Kicker";
import { Torii } from "./Torii";
export const Experience = () => {
  const currentKana = useGameStore((state) => state.currentKana);

  return (
    <>
      <OrbitControls />
      {/* LIGHTS */}
      <ambientLight intensity={1} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        color={"#9e69da"}
      />

      {/* BACKGROUND */}

      <RigidBody colliders={false} type="fixed" name="void">
        <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[400, 400]}
            resolution={1024}
            mixBlur={1}
            mixStrength={15}
            depthScale={1}
            minDepthThreshold={0.85}
            color="#dbecfb"
            metalness={0.6}
            roughness={1}
          />
        </mesh>
        <CuboidCollider position={[0, -3.5, 0]} args={[50, 0.1, 50]} sensor />
      </RigidBody>

      <Torii
        scale={[16, 16, 16]}
        position={[0, 0, -22]}
        rotation-y={1.25 * Math.PI}
      />
      {currentKana && (
        <Text position={[0, -1, -20]} fontSize={0.82}>
          {currentKana.name.toUpperCase()}
          <meshStandardMaterial color={"black"} opacity={0.6} transparent />
        </Text>
      )}
      <Torii
        scale={[10, 10, 10]}
        position={[-8, 0, -20]}
        rotation-y={1.4 * Math.PI}
      />
      <Torii scale={[10, 10, 10]} position={[8, 0, -20]} rotation-y={Math.PI} />

      <group position-y={-1}>
        <Kicker />
        {/* STAGE */}
        <RigidBody
          colliders={false}
          type="fixed"
          position-y={-0.5}
          friction={2}
        >
          <CylinderCollider args={[1 / 2, 5]} />
          <Cylinder scale={[5, 1, 5]} receiveShadow>
            <meshStandardMaterial color="white" />
          </Cylinder>
        </RigidBody>

        {/* CHARACTER */}
        <CharacterController />

        {/* KANA */}
        <KanaSpots />
      </group>
    </>
  );
};
