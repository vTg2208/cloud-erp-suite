import { useState, useCallback, useEffect } from 'react'

interface PaginationState {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function usePagination(initialLimit = 10) {
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  })

  const setPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }, [])

  const setTotal = useCallback((total: number) => {
    setPagination((prev) => ({
      ...prev,
      total,
      totalPages: Math.ceil(total / prev.limit),
    }))
  }, [])

  const hasNextPage = pagination.page < pagination.totalPages
  const hasPrevPage = pagination.page > 1

  return { pagination, setPage, setTotal, hasNextPage, hasPrevPage }
}
