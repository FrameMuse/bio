import { useState, useEffect } from "react"

function AutomaticBatching() {
  const [value, setValue] = useState(1)
  // Rerenders only once
  function click() {
    setValue(value => value + 1)
    setValue(value => value + 1)
  }
  // Rerenders twice
  async function asyncClick() {
    await setValue(value => value + 1)
    setValue(value => value + 1)
  }
  useEffect(() => {
    console.log("Updated: " + value)
  }, [value])
  return (
    <>
      <div onClick={click}>Click to rerender once: {value}</div>
      <div onClick={asyncClick}>Click to rerender twice: {value}</div>
    </>
  )
}

export default AutomaticBatching