import { Suspense, lazy } from 'react'

import { useGetUsersQuery } from '../../store/users/userApi'
import { cn } from '../../utils/cn'

import { Button } from '../ui/Button'
import { Paginate } from '../Paginate/Paginate'
import { Modal } from '../Modal/Modal'
import { DisplayErrorMessage } from '../ui/DisplayErrorMessage'

import { useQueryParams } from '../../hooks/useQueryParams'

import { USER_TABLE_HEADER } from '../../constants/const'

import pen from '../../assets/icons/pen.svg'
import garbage from '../../assets/icons/garbage.svg'
import { Spinner } from '../ui/Spinner'

const LazyStatistics = lazy(() => import('../Statistics/Statistics'))

interface Props {
  className?: string
}

export const UserTable = ({ className }: Props) => {
  const { queryParams: page } = useQueryParams('page')
  const { queryParams: orderBy, setQueryParams } = useQueryParams('orderBy')
  const { queryParams: search } = useQueryParams('search')

  const { data, isFetching, isError, isLoading } = useGetUsersQuery(
    {
      page: Number(page) || 1,
      ...(!!orderBy.trim() && {
        orderBy: orderBy as 'tokens:asc' | 'tokens:desc',
      }),
      ...(search.trim() !== '' && { search: search }),
    },
    { pollingInterval: 1000 * 60 }
  )

  if (isLoading) return <Spinner />
  if (isError) return <DisplayErrorMessage />
  if (!data?.data.length)
    return (
      <h1 className="text-5xl h-[400px] flex items-center justify-center text-center">
        {search
          ? 'Пользователь с таким именем не существует'
          : 'На данный момент нету пользователей'}
      </h1>
    )

  return (
    <div className={cn('relative  overflow-hidden', className)}>
      <div className="mini-tablet:overflow-x-scroll min-w-[600px]  mini-tablet:whitespace-nowrap mini-tablet:min-w-[100px] w-full ">
        <table
          className={cn('mb-28 min-w-full break-words table-fixed   ', {
            'opacity-50': isFetching,
          })}
        >
          <thead className="w-full py-[14px]  rounded-primary px-2 font-medium text-sm mini-tablet:text-xs text-gray-200 block bg-primary mb-[14px]">
            <tr className="grid grid-cols-7  mini-tablet:grid-cols-[repeat(7,200px)] md-phone:grid-cols-[repeat(7,80px)] md-phone:gap-x-8">
              {USER_TABLE_HEADER.map(val => (
                <th
                  className={cn({
                    'col-span-2': val.toLowerCase() === 'email',
                    'flex justify-center gap-x-2 ':
                      val.toLowerCase() === 'токены',
                  })}
                  key={val}
                >
                  {val}
                  {val.toLowerCase() === 'токены' && (
                    <Button
                      disabled={isFetching}
                      className={cn('text-xl font-bold -translate-y-1')}
                      onClick={() =>
                        setQueryParams<'tokens:asc' | 'tokens:desc'>(
                          orderBy === 'tokens:asc'
                            ? 'tokens:desc'
                            : 'tokens:asc'
                        )
                      }
                    >
                      {orderBy === 'tokens:desc' ? <>&#8593;</> : <>&#8595;</>}
                    </Button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block text-sm mini-tablet:text-xs">
            {data?.data.map(user => {
              const {
                email,
                name,
                role,
                subscription: {
                  tokens,
                  plan: { type },
                },
              } = user

              return (
                <Modal key={user.id}>
                  <Modal.Open
                    renderTrigger={fn => (
                      <tr
                        onClick={() => fn('statistics')}
                        className="cursor-pointer grid grid-cols-7  gap-x-4  text-center py-[17px] border-b-[1px] border-primary mini-tablet:gap-x-0 mini-tablet:grid-cols-[repeat(7,200px)] md-phone:grid-cols-[repeat(7,80px)] md-phone:gap-x-8"
                      >
                        <td className="col-span-2">{email}</td>
                        <td>{name}</td>
                        <td>{role}</td>
                        <td>{type}</td>
                        <td>{tokens} TKN</td>
                        <td>
                          <div className="flex gap-x-2  justify-center ">
                            <Button
                              disabled={isFetching}
                              className="max-w-5  w-full h-5 shrink-0 "
                            >
                              <img src={pen} alt="pen" />
                            </Button>

                            <Button
                              disabled={isFetching}
                              className="max-w-5 w-full h-5 shrink-0 "
                            >
                              <img src={garbage} alt="garbage" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )}
                  />
                  <Modal.Content
                    className="justify-end"
                    name="statistics"
                    renderContent={(closeModal, isOpened) => {
                      return (
                        <Suspense fallback={<Spinner />}>
                          <LazyStatistics
                            user={user}
                            closeModal={closeModal}
                            className={cn(
                              'translate-x-[480px] transition-translate duration-500 ease',
                              {
                                'translate-x-0': isOpened,
                              }
                            )}
                          />
                        </Suspense>
                      )
                    }}
                  />
                </Modal>
              )
            })}
          </tbody>
        </table>
        <Paginate
          className="absolute bottom-10 left-[50%] translate-x-[-50%]"
          pageCount={data?.pages || 5}
        />
      </div>
    </div>
  )
}
