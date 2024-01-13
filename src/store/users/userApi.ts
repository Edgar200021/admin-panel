import { UserApiFilter, UserResponse } from './types'
import { appApi } from '../appApi'

export const userApi = appApi.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<UserResponse, Partial<UserApiFilter>>({
      query: filters => ({
        url: '/user/list',
        params: { ...filters },
      }),
    }),
  }),
})

export const { useGetUsersQuery } = userApi
