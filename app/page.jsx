'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useRef } from 'react';
import Island from './models/Island';
import Sky from './models/Sky';
import Bird from './models/Bird';
import Plane from './models/Plane';
import Loader from './components/Loader';
import HomeInfo from './components/HomeInfo';
import { motion, AnimatePresence } from 'framer-motion';

import sakura from './sakura.mp3';
import { soundoff, soundon } from './icons';

console.log('soundoff', soundoff);

const HomePage = () => {
  const svgVariants = {
    visible: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      },
    },

    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

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
          src={!isPlayingMusic ? soundoff.src : soundon.src}
          alt="sound"
          className="cursor-pointer w-10 h-10 object-contain"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>

      <AnimatePresence>
        {isRotating || (
          <div className="flex flex-col items-center absolute bottom-5 left-1/2 transform -translate-x-1/2 fill-[#3C8BEA] z-30">
            <motion.svg
              className="sm:w-[50px] w-[70px]"
              viewBox="0 0 528.916 528.916"
              variants={svgVariants}
              animate={!isRotating ? 'visible' : ''}
              exit={isRotating ? 'exit' : ''}
            >
              <path
                d="M523.859,232.329h-41.701c-5.07,0-9.715-4.073-10.59-9.067c-19.57-111.442-117-196.409-233.962-196.409
			C106.589,26.853,0,133.441,0,264.458c0,131.018,106.589,237.605,237.606,237.605c12.675,0,22.95-10.275,22.95-22.949
			s-10.275-22.949-22.95-22.949c-105.708,0-191.706-85.998-191.706-191.707c0-105.707,85.995-191.706,191.703-191.706
			c91.583,0,168.325,64.569,187.208,150.564c1.086,4.951-2.359,9.012-7.426,9.012H380.66c-5.07,0-6.578,3.182-3.371,7.108
			l69.162,84.621c3.209,3.926,8.408,3.926,11.619,0l69.162-84.621C530.439,235.511,528.928,232.329,523.859,232.329z"
              />
            </motion.svg>
            <p className="text-blue-500 ">Click & Drag to Fly</p>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default HomePage;
