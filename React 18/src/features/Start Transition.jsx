import { startTransition, useTransition } from "react"
import { useState, useEffect } from "react"
const t = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempora unde nobis itaque dolores repellat officia cupiditate, impedit earum sequi. Temporibus distinctio dolorum quibusdam beatae id expedita neque natus asperiores?"
const items = [...Array(1e3)].map(() => t.slice(0, Math.round(Math.random() * 50)))
function StartTransition({ useNonBlockingInput }) {
  const [isPending, startTransition] = useTransition()
  const [searchValue, setSearchValue] = useState("")
  function input(event) {
    if (useNonBlockingInput) {
      nonBLockingInput(event)
    } else {
      blockingInput(event)
    }
  }
  function blockingInput(event) {
    console.time("Input: ")
    setSearchValue(event.currentTarget.value)
  }
  function nonBLockingInput(event) {
    console.time("Input: ")
    startTransition(() => {
      setSearchValue(event.currentTarget.value)
    })
  }
  function filterPredicate(value) {
    if (searchValue.length > 0) {
      // return [...value].every(char => searchValue.includes(char))
      return [...searchValue].every(char => value.includes(char))
    }

    return true
  }
  useEffect(() => {
    console.timeEnd("Input: ")
  }, [searchValue])
  return (
    <div>
      <h2>{useNonBlockingInput ? "This is Non-Blocking input" : "This is Blocking input"}</h2>
      <input type="search" onInput={input} />
      <details>
        <div style={{ display: "grid", background: isPending && "#ededed" }}>
          {items.filter(filterPredicate).map((value, index) => (
            <div key={"item_" + index}>{value}</div>
          ))}
        </div>
      </details>
    </div>
  )
}

export default StartTransition