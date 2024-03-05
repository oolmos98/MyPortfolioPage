import { useState, useEffect, useRef } from "react";
import AnimatedCursor from "react-animated-cursor";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import Portfolio from "./Portfolio";
import whoami from "./me";
import BIRDS from "vanta/dist/vanta.birds.min";
import "./App.css";

const App = () => {
  // const [loadedParticles, setLoadedParticles] = useState(false);

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

  // // Options for Particles
  // const options = useMemo(
  //   () => ({
  //     // background: {
  //     //   color: {
  //     //     value: "#0d47a1",
  //     //   },
  //     // },
  //     // fpsLimit: isMobile ? 60 : 120,
  //     fpsLimit: 120,
  //     detectRetina: true,
  //     fullScreen: {
  //       enable: true,
  //       zIndex: 0,
  //     },
  //     pauseOnBlue: true,
  //     pauseOnOutsideViewport: true,
  //     interactivity: {
  //       events: {
  //         onClick: {
  //           enable: true,
  //           mode: "push",
  //         },
  //         onHover: {
  //           enable: true,
  //           mode: "repulse",
  //           // mode: "grab",
  //         },
  //       },
  //       modes: {
  //         push: {
  //           quantity: 4,
  //         },
  //         repulse: {
  //           distance: 150,
  //           duration: 0.4,
  //         },
  //       },
  //     },

  //     particles: {
  //       color: {
  //         value: "#ffffff",
  //       },
  //       links: {
  //         color: "#000",
  //         distance: 150,
  //         enable: true,
  //         opacity: 1,
  //         width: 2,
  //       },
  //       move: {
  //         direction: "none",
  //         enable: true,
  //         outModes: {
  //           default: "bounce",
  //         },
  //         random: false,
  //         speed: 4,
  //         straight: false,
  //       },
  //       number: {
  //         density: {
  //           enable: true,
  //         },
  //         value: 80,
  //       },
  //       shape: {
  //         type: "circle",
  //       },
  //       size: {
  //         value: { min: 1, max: 4 },
  //       },
  //     },
  //   }),
  //   []
  // );

  // // this should be run only once per application lifetime
  // useEffect(() => {
  //   initParticlesEngine(async (engine) => {
  //     // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
  //     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //     // starting from v2 you can add only the features you need reducing the bundle size
  //     await loadSlim(engine);
  //     // await loadBasic(engine);
  //   }).then(() => {
  //     setLoadedParticles(true);
  //     console.log("Loaded Particles Engine");
  //   });
  // }, []);

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
      {/* <Particles
        options={options}
        className={loadedParticles ? "fade-in" : ""}
      /> */}
      <Portfolio me={whoami} />
    </div>
  );
};

export default App;
