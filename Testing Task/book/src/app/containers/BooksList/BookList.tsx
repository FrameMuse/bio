import { FormEvent, useEffect, useState } from "react"
import { useQuery } from "react-fetching-library"
import { getBookList } from "app/api/actions/books"
import BookTable, { BookTableRowProps } from "app/components/BookTable/BookTable"
import { SortType } from "app/interfaces/Laravel"
import BookListModifier from "./BookListModifier"

function BookList() {
  const [page, setPage] = useState(1)
  const [sorting, setSorting] = useState<Partial<SortType<keyof BookTableRowProps>>>({})
  const [filters, setFilters] = useState<Partial<BookTableRowProps>>({})
  const { payload, query } = useQuery(getBookList({ ...sorting, ...filters, page }))
  function nextPage() {
    if (payload == null) return
    if (page < payload.total) {
      setPage(page + 1)
    }
  }
  function prevPage() {
    if (payload == null) return
    if (page > 1) {
      setPage(page - 1)
    }
  }
  function filterFactory(name: keyof BookTableRowProps) {
    return (event: FormEvent<HTMLInputElement>) => {
      const target = event.currentTarget

      setFilters({
        ...filters,
        [name]: target.value
      })
    }
  }
  useEffect(() => setPage(1), [sorting, filters])
  return (
    <div className="book-list">
      <h2 className="book-list__title">Book List</h2>
      <div className="book-list__filters">
        <input onInput={filterFactory("title")} placeholder="Enter to filter by title..." />
        <input onInput={filterFactory("date")} placeholder="Enter to filter by date..." />
        <input onInput={filterFactory("author")} placeholder="Enter to filter by author..." />
        <input onInput={filterFactory("desc")} placeholder="Enter to filter by desc..." />
        <input onInput={filterFactory("image")} placeholder="Enter to filter by image..." />
      </div>
      <div className="book-list__container">
        {payload ? (
          <BookTable books={payload.data} onSortingChange={setSorting} />
        ) : "Something's not going well"}
      </div>
      <div className="book-list-paging">
        <button className="book-list-paging__button" onClick={() => prevPage()}>Go to previous page</button>
        <div className="book-list-paging__page">{page}/{payload?.total ?? "?"}</div>
        <button className="book-list-paging__button" onClick={() => nextPage()}>Go to next page</button>
      </div>
      <BookListModifier onSubmit={query} />
    </div >
  )
}

export default BookList