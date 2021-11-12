import { BookTableRowProps } from "app/components/BookTable/BookTable"
import { PaginationType, SortType } from "app/interfaces/Laravel"
import { createQuery } from "app/utils/common"
import { Action } from "react-fetching-library"

export const getBookList = (request: Partial<SortType<keyof BookTableRowProps>> & Partial<BookTableRowProps> & { page: number }): Action<PaginationType<BookTableRowProps[]>> => ({
  endpoint: "/books?" + createQuery(request),
  method: "GET"
})

export const postAddNewBook = (request: Partial<BookTableRowProps>): Action<{
  message?: string
  errors: Record<string, string> | null
}> => ({
  endpoint: "/books/create",
  method: "POST",
  body: request
})