import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: T | null
  isLoading: boolean
  error: string | null
}

export function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        setState({ data, isLoading: false, error: null })
      } catch (error) {
        setState({
          data: null,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

    fetchData()
  }, [url])

  return state
}
