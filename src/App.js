import { useState, useEffect, useRef } from "react";
import AnimatedCursor from "react-animated-cursor";
import Portfolio from "./Portfolio";
import whoami from "./me";
import BIRDS from "vanta/dist/vanta.birds.min";
import "./App.css";

const App = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          backgroundColor: 0x3f6ba7,
          backgroundAlpha: 0,
          // color1: 0x83ff,
          // color2: 0x818d9,
          scale: 1.0,
          scaleMobile: 1.0,
          speedLimit: 1.5,
          separation: 82.0,
          wingSpan: 40.0,
          quantity: 4,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div>
      <div className="container" ref={myRef} />
      <AnimatedCursor
        innerSize={15}
        outerSize={15}
        color="40, 40, 40"
        outerAlpha={0.8}
        innerScale={0.7}
        outerScale={5}
        trailingSpeed={10}
      />
      <Portfolio me={whoami} />
    </div>
  );
};

export default App;
