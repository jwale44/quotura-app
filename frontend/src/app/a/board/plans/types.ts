export interface ISubscription {
  id: string
  plan_code: string
  expires_at: string
}

export interface IPlan {
  id: string
  plan_code: string
  name: string
  amount: number
  interval: string
}
