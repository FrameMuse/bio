import { StrictMode } from "react"
import { ClientContextProvider } from "react-fetching-library"
import { ClientAPI } from "./api/client"
import BookList from "./containers/BooksList/BookList"

function App() {
  return (
    <StrictMode>
      <ClientContextProvider client={ClientAPI}>
        <BookList />
      </ClientContextProvider>
    </StrictMode>
  )
}

export default App