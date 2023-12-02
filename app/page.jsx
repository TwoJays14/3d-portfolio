'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import Island from './models/Island';
import Sky from './models/Sky';
import Bird from './models/Bird';
import Plane from './models/Plane';
import Loader from './components/Loader';
import HomeInfo from './components/HomeInfo';

import sakura from './sakura.mp3';
import { soundoff, soundon } from './icons';

const HomePage = () => {
  // const audioRef = useRef(new Audio(sakura));
  // audioRef.current.volume = 0.4;
  // audioRef.current.loop = true;
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const audio = new Audio(sakura);
      audio.volume = 0.4;
      audio.loop = true;

      if (isPlayingMusic) {
        audio.play();
      }

      return () => {
        audio.pause();
      };
    }
  }, [isPlayingMusic]);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        screenScale = [0.9, 0.9, 0.9];
        screenPosition = [0, -6.5, -43];
      } else {
        screenScale = [1, 1, 1];
        screenPosition = [0, -6.5, -43];
      }

      return [screenScale, screenPosition, rotation];
    }

    return [
      [0.9, 0.9, 0.9],
      [0, -6.5, -43],
      [0.1, 4.7, 0],
    ];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        screenScale = [1.5, 1.5, 1.5];
        screenPosition = [0, -1.5, 0];
      } else {
        screenScale = [3, 3, 3];
        screenPosition = [0, -4, -4];
      }
      return [screenScale, screenPosition];
    }

    return [
      [1.5, 1.5, 1.5],
      [0, -1.5, 0],
    ];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustIslandForScreenSize();

  const [planeScale, planePosition] = adjustPlaneForScreenSize();

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>
      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          {/* <pointLight position={[10, 10, 10]} /> */}
          {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />
          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            screen={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
            isRotating={isRotating}
          />
          <Bird />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-2 left-2">
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt="sound"
          className="cursor-pointer w-10 h-10 object-contain"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};
export default HomePage;
