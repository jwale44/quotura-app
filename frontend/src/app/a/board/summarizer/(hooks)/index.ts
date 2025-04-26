"use client"

import httpService from "@/_api/HTTPService"
import { useMutation } from "@tanstack/react-query"
import { SummarizeContentValues } from "../types"
import { useAuth } from "@clerk/nextjs"

export const usePostSummarizeContent = () => {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (
      content: SummarizeContentValues
    ): Promise<{ summary: string }> => {
      const token = await getToken()

      return await httpService.post(
        "/v1/agents/summary",
        { ...content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
  })
}
