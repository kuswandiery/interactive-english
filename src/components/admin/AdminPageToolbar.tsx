import { SearchBar } from '@/components/ui/SearchBar'
import { Select } from '@/components/ui/Select'

interface FilterOption {
  label: string
  value: string
}

interface AdminPageToolbarProps {
  search: string
  onSearch: (value: string) => void
  searchPlaceholder?: string
  filterValue: string
  onFilter: (value: string) => void
  filterOptions?: FilterOption[]
  filterLabel?: string
  action?: React.ReactNode
}

export function AdminPageToolbar({
  search,
  onSearch,
  searchPlaceholder,
  filterValue,
  onFilter,
  filterOptions,
  filterLabel = 'Filter',
  action,
}: AdminPageToolbarProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar
          value={search}
          onChange={onSearch}
          placeholder={searchPlaceholder}
          ariaLabel="Search records"
          className="sm:w-72"
        />
        {filterOptions && filterOptions.length > 0 && (
          <Select
            aria-label={filterLabel}
            value={filterValue}
            onChange={(e) => onFilter(e.target.value)}
            options={[{ label: `All ${filterLabel}`, value: '' }, ...filterOptions]}
            className="sm:w-56"
          />
        )}
      </div>
      {action}
    </div>
  )
}