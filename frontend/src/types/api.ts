export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface ApiError {
  success: false
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

export interface PaginationParams {
  page: number
  limit: number
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
}
