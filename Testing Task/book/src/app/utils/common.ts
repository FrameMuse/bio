export function createQuery(QueryObject: Record<string, string | number | null | undefined>): string {
  if (!QueryObject) {
    return ""
  }

  const QueryKeys = Object.keys(QueryObject)
  const QueryArray = QueryKeys.map(function (key) {
    const value = QueryObject[key]
    return value ? encodeURIComponent(key) + "=" + encodeURIComponent(value) : ""
  })

  return QueryArray.filter(query => query).join("&")
}