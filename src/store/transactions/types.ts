export interface Transaction {
  id: string
  provider: string
  currency: string
  amount: number
  status: 'PENDING' | 'SUCCEDED'
  type: 'WRITE_OFF' | 'REPLENISH'
  plan_id: string
  user_id: string
  referral_id: string
  external_id: string
  created_at: string
}
