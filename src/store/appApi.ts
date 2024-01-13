import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const appApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://test.gefara.xyz/api/v1/',
  }),
  //@ts-expect-error sdsd
  endpoints: builder => ({}),
})
