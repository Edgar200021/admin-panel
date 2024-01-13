import { cn } from '../../utils/cn'

import { Input } from '../ui/Input'

import search from '../../assets/icons/search.svg'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useQueryParams } from '../../hooks/useQueryParams'

interface Props {
  className?: string
}

export const UserSearch = ({ className }: Props) => {
  const { setQueryParams, deleteQueryParams } = useQueryParams('search')
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    if (debouncedValue === '') {
      deleteQueryParams()
      return
    }
    if (debouncedValue !== undefined) {
      deleteQueryParams('page')
      setQueryParams(debouncedValue.toString())
    }
  }, [debouncedValue])

  return (
    <div className={cn('', className)}>
      <label className="p-4 rounded-primary flex items-center gap-x-3 border-[1px] border-primary">
        <div className="w-6 h-6">
          <img src={search} alt="search" />
        </div>
        <Input onChange={e => setValue(e.target.value)} placeholder="Поиск" />
      </label>
    </div>
  )
}
