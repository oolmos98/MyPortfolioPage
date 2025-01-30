import AnimatedCursor from "react-animated-cursor";
import Portfolio from "./Portfolio";
import whoami from "./me";
import React, { useState, useEffect, useRef } from 'react'
import HALO from 'vanta/dist/vanta.halo.min'
import "./App.css";

const App = () => {
  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(HALO({
        el: myRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        baseColor: 0xff,
        backgroundColor: 0x3468,
        amplitudeFactor: 3.00,
        size: 0.70
      }))
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return (
    <>
      <div
        ref={myRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          zIndex: -1,
          backgroundSize: '100% 100%',
        }}
      />
      <AnimatedCursor
        innerSize={15}
        outerSize={15}
        color="255, 255, 255"
        outerAlpha={0.8}
        innerScale={0.7}
        outerScale={5}
        trailingSpeed={10}
      />
      <Portfolio me={whoami} />
    </>
  );
};

export default App;
