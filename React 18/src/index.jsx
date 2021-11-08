import ReactDOM from "react-dom"

import AutomaticBatching from "./features/Automatic Batching"
import StartTransition from "./features/Start Transition"
ReactDOM
  .createRoot(document.getElementById("root"))
  .render(
    <div>
      <AutomaticBatching />
      <br />
      <br />
      <br />
      <StartTransition />
      <br />
      <br />
      <br />
      <StartTransition useNonBlockingInput />
    </div>
  )