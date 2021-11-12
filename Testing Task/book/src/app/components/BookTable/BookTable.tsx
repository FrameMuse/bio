import { useState } from "react"
import { SortType } from "app/interfaces/Laravel"
import { useEffect } from "react"

type SortingState = Partial<SortType<keyof BookTableRowProps>>

interface BookTableProps {
  books: BookTableRowProps[]
  onSortingChange(state: SortingState): void
}

function BookTable(props: BookTableProps) {
  const [sort, setSort] = useState<SortingState["sort"]>()
  const [sortBy, setSortBy] = useState<SortingState["sortBy"]>()
  function sortChange(name: keyof BookTableRowProps) {
    setSort(name)
    setSortBy(sortBy === "asc" ? "desc" : "desc")
  }
  useEffect(() => {
    props.onSortingChange({ sort, sortBy })
  }, [sort, sortBy])
  return (
    <table className="book-table">
      <th>
        <td onClick={() => sortChange("title")}>Title</td>
        <td onClick={() => sortChange("date")}>Date</td>
        <td onClick={() => sortChange("author")}>Author</td>
        <td onClick={() => sortChange("desc")}>Description</td>
        <td onClick={() => sortChange("image")}>Image</td>
      </th>
      {props.books.map((book, index) => (
        <BookTableRow {...book} key={"book_" + index} />
      ))}
    </table>
  )
}


export interface BookTableRowProps {
  title: string
  date: string // Y-m-d
  author: string
  desc: string
  image: string
}

function BookTableRow(props: BookTableRowProps) {
  return (
    <tr>
      <td>{props.title}</td>
      <td>{props.date}</td>
      <td>{props.author}</td>
      <td>{props.desc}</td>
      <td>
        <img className="book-table__image" src={props.image} alt="book" />
      </td>
    </tr>
  )
}

export default BookTable