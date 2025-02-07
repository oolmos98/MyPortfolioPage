import AnimatedCursor from "react-animated-cursor";
import Portfolio from "./Portfolio";
import whoami from "./me";

import "./App.css";

const App = () => {
  
  return (
    <>
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
