import { Transaction } from './types'
import { appApi } from '../appApi'
import { User } from '../users/types'

export const transactionsApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getUserTransaction: builder.query<Transaction[], User['id']>({
      query: userId => ({
        url: `/user/${userId}/transactions`,
      }),
    }),
  }),
})

export const { useGetUserTransactionQuery } = transactionsApi
