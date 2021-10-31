import ReactDom from "react-dom"

import AutomaticBatching from "./features/Automatic Batching"
import StartTransition from "./features/Start Transition"

ReactDom.render(
  <div>
    <AutomaticBatching />
    <StartTransition />
  </div>,
  document.getElementById("root")
)