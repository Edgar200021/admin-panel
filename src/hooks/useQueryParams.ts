import { useSearchParams } from 'react-router-dom'

export const useQueryParams = (defaultKey: string) => {
  const [searchParams, setSearchParams] = useSearchParams()

  function setQueryParams<T extends string>(query: T) {
    searchParams.set(defaultKey, query)
    setSearchParams(searchParams)
  }

  function deleteQueryParams(otherKey?: string) {
    searchParams.delete(otherKey || defaultKey)
    setSearchParams(searchParams)
  }

  const value = searchParams.get(defaultKey)

  return {
    queryParams: value === null ? '' : value,
    setQueryParams,
    deleteQueryParams,
  }
}
