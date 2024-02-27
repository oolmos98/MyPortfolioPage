import { useState, useEffect, useMemo } from "react";

import AnimatedCursor from "react-animated-cursor";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import Portfolio from "./Portfolio";
import whoami from "./me";

const App = () => {
  const [loadedParticles, setLoadedParticles] = useState(false);

  // Options for Particles
  const options = useMemo(
    () => ({
      // background: {
      //   color: {
      //     value: "#0d47a1",
      //   },
      // },
      // fpsLimit: isMobile ? 60 : 120,
      fpsLimit: 120,
      detectRetina: true,
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      pauseOnBlue: true,
      pauseOnOutsideViewport: true,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 150,
            duration: 0.4,
          },
        },
      },

      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#000",
          distance: 150,
          enable: true,
          opacity: 1,
          width: 2,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 4,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 4 },
        },
      },
    }),
    []
  );

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      await loadSlim(engine);
      // await loadBasic(engine);
    }).then(() => {
      setLoadedParticles(true);
      console.log("Loaded Particles Engine");
    });
  }, []);

  return (
    <>
      <AnimatedCursor
        innerSize={15}
        outerSize={15}
        color="40, 40, 40"
        outerAlpha={0.8}
        innerScale={0.7}
        outerScale={5}
        trailingSpeed={10}
      />
      <Particles
        options={options}
        className={loadedParticles ? "fade-in" : ""}
      />
      <Portfolio me={whoami} />
    </>
  );
};

export default App;
