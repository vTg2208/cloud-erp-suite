import { useState, useMemo, type ReactNode } from 'react'
import { FiSearch, FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight, FiFilter, FiX } from 'react-icons/fi'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (item: T) => ReactNode
}

interface AdvancedTableProps<T> {
  data: T[]
  columns: Column<T>[]
  renderActions?: (item: T) => ReactNode
  searchFields?: string[]
  pageSize?: number
  title?: string
}

export default function AdvancedTable<T extends Record<string, unknown>>({
  data,
  columns,
  renderActions,
  searchFields = [],
  pageSize = 10,
  title,
}: AdvancedTableProps<T>) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [filterValue, setFilterValue] = useState('')
  const [filterKey, setFilterKey] = useState<string>('')

  const searchableData = useMemo(() => {
    let result = [...data]

    if (search && searchFields.length > 0) {
      const lower = search.toLowerCase()
      result = result.filter((item) =>
        searchFields.some((field) =>
          String(item[field]).toLowerCase().includes(lower)
        )
      )
    }

    if (filterKey && filterValue) {
      result = result.filter((item) => String(item[filterKey]) === filterValue)
    }

    if (sortKey) {
      result.sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDir === 'asc' ? aVal - bVal : bVal - aVal
        }
        const aStr = String(aVal).toLowerCase()
        const bStr = String(bVal).toLowerCase()
        if (sortDir === 'asc') return aStr.localeCompare(bStr)
        return bStr.localeCompare(aStr)
      })
    }

    return result
  }, [data, search, sortKey, sortDir, filterKey, filterValue, searchFields])

  const totalPages = Math.ceil(searchableData.length / pageSize)
  const paginatedData = searchableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setFilterValue('')
    setFilterKey('')
    setSortKey(null)
    setCurrentPage(1)
  }

  const hasActiveFilters = search || filterValue || sortKey

  return (
    <div>
      <div className="card overflow-hidden p-0">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
                  placeholder="Search..."
                  className="input-default pl-9 w-full"
                />
              </div>

              {filterKey && (
                <div className="flex items-center gap-2">
                  <FiFilter className="text-gray-400" size={16} />
                  <select
                    value={filterValue}
                    onChange={(e) => { setFilterValue(e.target.value); setCurrentPage(1) }}
                    className="input-default text-sm"
                  >
                    <option value="">All</option>
                    {Array.from(new Set(data.map((d) => String(d[filterKey])))).map((val) => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              {hasActiveFilters && (
                <button onClick={clearFilters} className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors">
                  <FiX size={14} /> Clear filters
                </button>
              )}
              <span>{searchableData.length} results</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-left ${
                      col.sortable ? 'cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 select-none' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        <span className="text-gray-400">
                          {sortKey === col.key ? (
                            sortDir === 'asc' ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />
                          ) : (
                            <span className="opacity-30"><FiChevronUp size={14} /></span>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                {renderActions && (
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, idx) => (
                <tr key={(item.id as string) ?? idx} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {col.render ? col.render(item) : String(item[col.key] ?? '')}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="py-3 px-4 text-center">
                      {renderActions(item)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {paginatedData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-1">No results found</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, searchableData.length)} of {searchableData.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  if (totalPages <= 7) return true
                  if (page === 1 || page === totalPages) return true
                  if (Math.abs(page - currentPage) <= 1) return true
                  return false
                })
                .map((page, idx, arr) => {
                  const showEllipsis = idx > 0 && page - arr[idx - 1] > 1
                  return (
                    <span key={page} className="flex items-center">
                      {showEllipsis && <span className="px-2 text-gray-400">…</span>}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary-600 text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {page}
                      </button>
                    </span>
                  )
                })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <FiChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {title && (
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Filter by: {columns.filter((c) => c.sortable).map((c) => c.label).join(', ')}
        </div>
      )}
    </div>
  )
}
