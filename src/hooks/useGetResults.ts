import { useQuery } from 'convex/react'
import { api } from '../convex/_generated/api'

export const useGetResults = () => {
  const data = useQuery(api.results.get)
  const isLoading = data === undefined
  return { data: data || [], isLoading }
}
