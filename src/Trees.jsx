import { forwardRef, useMemo } from 'react';
import { useGLTF } from "@react-three/drei";
import { RedFormat, DataTexture } from "three";

export const Trees = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF("/trees.glb");
  const toneMap = useMemo(() => {
    const format = RedFormat;
    const colors = new Uint8Array(4)
    for (let c = 0; c <= colors.length; c++) {
      colors[c] = (c / colors.length) * 256
    }
    const gradientMap = new DataTexture(colors, colors.length, 1, format)
    gradientMap.needsUpdate = true
    return gradientMap;
  }, [])
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Foliage.geometry}
        material={materials["Stylized Foliage"]}
        position={[0.33, -0.05, -0.68]}
      ></mesh>
      <meshToonMaterial gradientMap={toneMap} color={"#234549"} />
    </group>
  );
})

useGLTF.preload("/trees.glb");
