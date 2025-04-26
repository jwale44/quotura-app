"use client"

import httpService from "@/_api/HTTPService"
import { useAuth } from "@clerk/nextjs"
import { ISubscription } from "../types"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetSubscriptionPlans = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      const token = await getToken()

      return await httpService.get("/v1/subscriptions/plans", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useGetUserSubscription = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["user-subscription"],
    queryFn: async (): Promise<ISubscription | null> => {
      const token = await getToken()

      return await httpService.get("/v1/subscriptions/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useVerifyPlanPaymentMutation = () => {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async ({
      plan_code,
      reference,
    }: {
      plan_code: string
      reference: string
    }) => {
      const token = await getToken()

      return await httpService.post(
        "/v1/subscriptions/verify-payment",
        { plan_code, reference },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
  })
}

export const useGetUserCredits = () => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["user-credits"],
    queryFn: async () => {
      const token = await getToken()

      return await httpService.get("/v1/users/credits/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    staleTime: Infinity,
    gcTime: 60 * 1000 * 10, // 10 minutes
  })
}
