import Portfolio from "./Portfolio"
import whoami from "./me"

const App = () => {
  return (
    <>
      <Portfolio me={whoami} />
    </>
  )
}

export default App
