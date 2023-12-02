'use client';

import { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { a } from '@react-spring/three';

import islandScene from '../3d/island.glb';

const Island = ({ isRotating, setIsRotating, setCurrentStage, ...props }) => {
  const islandRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX; // figure out if its a touch event (mobile) or not
    console.log({ clientX }, 'Event:', e);
    lastX.current = clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX; // figure out if its a touch event (mobile) or not

      const delta = (clientX - lastX.current) / viewport.width; // calculate the difference horizontal position

      islandRef.current.rotation.y += delta * 0.01 * Math.PI; // update islands position based on the mouse
      lastX.current = clientX; // update lastX to the current position
      rotationSpeed.current = delta * 0.01 * Math.PI; // update the rotation speed}
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.01 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else if (e.key === 'ArrowRight') {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y -= 0.01 * Math.PI;
      rotationSpeed.current = -0.0125;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false);
    }
  };

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current; // slowing down of plane as u scroll
    } else {
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation

      // The switch statement checks each case condition in order. If the condition evaluates to true, the corresponding code block is executed. If none of the conditions evaluate to true, the code block inside the "default" case is executed.

      // In this specific code, the value of "normalizedRotation" is compared against different ranges of values. Depending on which range it falls into, the "currentStage" variable is set to a specific value. If "normalizedRotation" falls into none of the specified ranges, "currentStage" is set to null.

      // Here's a breakdown of the ranges and their corresponding "currentStage" values:
      // - If "normalizedRotation" is between 5.45 and 5.85, "currentStage" is set to 4.
      // - If "normalizedRotation" is between 0.85 and 1.3, "currentStage" is set to 3.
      // - If "normalizedRotation" is between 2.4 and 2.6, "currentStage" is set to 2.
      // - If "normalizedRotation" is between 4.25 and 4.75, "currentStage" is set to 1.
      // - If "normalizedRotation" doesn't fall into any of the specified ranges, "currentStage" is set to null.
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <a.group ref={islandRef} {...props}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
};

export default Island;
