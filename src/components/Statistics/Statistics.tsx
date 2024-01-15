import { MutableRefObject } from 'react'
import { useOutsideClick } from '../../hooks/useOutsideClick'
import { cn } from '../../utils/cn'
import { Button } from '../ui/Button'
import { Chart } from '../Chart/Chart'
import { StatisticsTable } from '../StatisticsTable/StatisticsTable'
import { User } from '../../store/users/types'
import { useGetUserTransactionQuery } from '../../store/transactions/transactionsApi'
import { Transaction } from '../../store/transactions/types'
import { Spinner } from '../ui/Spinner'
import { DisplayErrorMessage } from '../ui/DisplayErrorMessage'

interface Props {
  className?: string
  closeModal?: () => void
  user: User
}

const Statistics = ({ className, closeModal, user }: Props) => {
  const { data, isFetching, isError } = useGetUserTransactionQuery(user.id)
  const ref = useOutsideClick<HTMLDivElement>(closeModal)

  //* По тз надо было показывать данные за последние 24 часа, но после 13 числа данные не обновлялись, по этому закомментировал, чтобы показать работу
  //  const filteredData = useMemo(
  //    () =>
  //      data?.filter(transaction => {
  //        return (
  //          new Date().getDate() - new Date(transaction.created_at).getDate() <= 1
  //        )
  //      }),
  //    [data]
  //  )

  if (!data) return

  return (
    <div
      ref={ref as MutableRefObject<HTMLDivElement>}
      className={cn(
        'py-14 pl-5 pr-10 mini-tablet:px-3 max-w-[470px] overflow-y-auto h-full w-full bg-secondary',
        className
      )}
    >
      {isFetching && <Spinner />}
      {isError ? (
        <DisplayErrorMessage />
      ) : (
        <>
          <div className="mb-[18px] flex items-center justify-between">
            <span className="font-semibold text-xl">{user.email}</span>
            <Button
              className="w-6 h-6 hover:translate-y-0 active:translate-y-0 relative before:absolute before:top-[50%] before:translate-y-[-50%] before:rotate-45 before:left-0 before:w-full before:h-[2px]  before:bg-white after:absolute after:top-[50%] after:translate-y-[-50%] after:-rotate-45 after:left-0 after:w-full after:h-[2px]  after:bg-white "
              onClick={() => closeModal?.()}
            ></Button>
          </div>
          <span className="font-semibold text-xl mb-[18px] block">
            Использование токенов
          </span>
          <Chart<Transaction, Transaction[]>
            YAxisKey="amount"
            //data={filteredData}
            data={data}
            XAxisKey="created_at"
            className="mb-3"
          />
          <span className="text-xs font-medium text-gray-100 block  max-w-fit mx-auto  pl-8 relative before:absolute before:left-0 before:w-4 before:h-4 before:bg-[#1C64F2] before:rounded-[4px] mb-[18px] ">
            {user.email}
          </span>
          <hr className="border-x-0 border-t-0 h-px border-b-[1px] border-primary mb-[18px]" />
          <span className="font-semibold text-xl mb-[18px] block">
            История операций
          </span>
          <StatisticsTable
            transactions={data} /*transactions={filteredData}*/
          />
        </>
      )}
    </div>
  )
}

export default Statistics
