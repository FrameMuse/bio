import { FormEvent, Suspense, useState } from "react"
import { SuspenseQuery } from "react-fetching-library"
import { getBookList } from "app/api/actions/books"
import BookTable, { BookTableRowProps } from "app/components/BookTable/BookTable"
import SuspenseLoader from "app/components/SuspenseLoader/SuspenseLoader"
import { SortType } from "app/interfaces/Laravel"

function BookList() {
  const [sorting, setSorting] = useState<Partial<SortType<keyof BookTableRowProps>>>({})
  const [filters, setFilters] = useState<Partial<BookTableRowProps>>({})
  function filterFactory(name: keyof BookTableRowProps) {
    return (event: FormEvent<HTMLInputElement>) => {
      const target = event.currentTarget

      setFilters({
        ...filters,
        [name]: target.value
      })
    }
  }
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
        <Suspense fallback={<SuspenseLoader />}>
          <SuspenseQuery action={getBookList({ ...sorting, ...filters })}>
            {({ payload }) => payload ? (
              <BookTable books={payload.data} onSortingChange={setSorting} />
            ) : "Something's not going well"}
          </SuspenseQuery>
        </Suspense>
      </div>
    </div >
  )
}

export default BookList