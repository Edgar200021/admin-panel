import { STATISTICS_TABLE_HEADER } from '../../constants/const'
import { Transaction } from '../../store/transactions/types'
import { cn } from '../../utils/cn'
import { formatDate } from '../../utils/date'

interface Props {
  className?: string
  transactions: Transaction[]
}

export const StatisticsTable = ({ className, transactions }: Props) => {
  return (
    <table className={cn('w-full break-words table-fixed', className)}>
      <thead className="py-[14px]  rounded-primary px-2 font-medium text-sm text-gray-200 block  bg-primary mb-[14px]">
        <tr className="grid grid-cols-3">
          {STATISTICS_TABLE_HEADER.map(val => (
            <th key={val}>{val}</th>
          ))}
        </tr>
      </thead>
      <tbody className="block max-h-[400px] overflow-y-auto">
        {transactions.map(transaction => {
          return (
            <tr
              key={transaction.id}
              className="grid items-center grid-cols-3  gap-x-4  text-center py-[17px] border-b-[1px] border-primary"
            >
              <td>
                {transaction.type === 'WRITE_OFF' ? 'Списание' : 'Пополнение'}
              </td>
              <td
                className={cn('text-green', {
                  'text-red': transaction.type === 'WRITE_OFF',
                })}
              >
                {transaction.type === 'WRITE_OFF' && '-'}
                {transaction.amount} BTKN
              </td>
              <td>
                {formatDate(new Date(transaction.created_at), {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
