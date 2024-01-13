import ReactPaginate, { ReactPaginateProps } from 'react-paginate'
import { cn } from '../../utils/cn'
import { memo } from 'react'
import { useQueryParams } from '../../hooks/useQueryParams'

interface Props extends ReactPaginateProps {
  className?: string
}

export const Paginate = memo(({ className, ...otherProps }: Props) => {
  const { queryParams: page, setQueryParams } = useQueryParams('page')

  function handleChangePage({ selected }: { selected: number }) {
    setQueryParams((selected + 1).toString())
  }

  if (otherProps.pageCount === 1) return null

  return (
    <ReactPaginate
      className={cn(' flex items-center justify-center ', className)}
      breakLabel="...."
      nextLabel={<span>&#8594;</span>}
      nextClassName="text-gray-200 ml-[14px]"
      previousClassName="text-gray-200 mr-[14px]"
      previousLabel={<span>&#8592;</span>}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={handleChangePage}
      pageClassName="w-10 h-10 flex items-center justify-center"
      breakClassName="w-10 h-10 flex items-center justify-center"
      activeClassName="bg-[#1C64F2] rounded-[8px]"
      initialPage={Number(page)}
      previousLinkClassName={cn({
        hidden: Number(page) === 0 || Number(page) === 1,
      })}
      nextLinkClassName={cn({
        hidden: otherProps.pageCount === +page,
      })}
      {...otherProps}
    />
  )
})
