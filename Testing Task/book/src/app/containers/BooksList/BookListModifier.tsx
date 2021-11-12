import { postAddNewBook } from "app/api/actions/books"
import { ClientAPI } from "app/api/client"
import { FormEvent } from "react"

interface BookListModifierProps {
  onSubmit(): void
}

function BookListModifier(props: BookListModifierProps) {
  function addNewBook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const elements = event.currentTarget.elements as unknown as {
      [x: string]: HTMLInputElement
    }

    ClientAPI
      .query(postAddNewBook({
        title: elements.title.value,
        date: elements.date.value,
        author: elements.author.value,
        desc: elements.desc.value,
        image: elements.image.value
      }))
      .then(() => props.onSubmit())
  }
  return (
    <form className="book-list-modifier" onSubmit={addNewBook}>
      <input name="title" placeholder="Enter title..." />
      <input name="date" placeholder="Enter date..." />
      <input name="author" placeholder="Enter author..." />
      <input name="desc" placeholder="Enter desc..." />
      <input name="image" placeholder="Enter image..." />
      <button className="book-list-modifier__add" type="submit">Add a new book</button>
    </form>
  )
}

export default BookListModifier