export interface User {
  id: string
  email: string
  tg_id: string
  name: string
  avatar: string
  role: 'ADMIN' | 'USER'
  created_at: string
  subscription: {
    tokens: number
    plan: {
      type: string
    }
  }
}

export interface UserResponse {
  data: User[]
  pages: number
}

export interface UserApiFilter {
  page: number
  search: string
  orderBy: 'tokens:asc' | 'tokens:desc'
}
