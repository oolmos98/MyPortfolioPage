import AnimatedCursor from "react-animated-cursor"
import Portfolio from "./Portfolio"
import whoami from "./me"

const App = () => {
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
      <Portfolio me={whoami} />
    </>
  )
}

export default App
