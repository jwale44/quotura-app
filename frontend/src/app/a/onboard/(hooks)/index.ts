import { useMutation } from "@tanstack/react-query"
import { OnboardValues } from "../types"
import { useAuth } from "@clerk/nextjs"
import httpService from "@/_api/HTTPService"

export const usePostOnboardData = () => {
  const { getToken } = useAuth()

  return useMutation({
    mutationFn: async (values: OnboardValues) => {
      const token = await getToken()

      return await httpService.post("/v1/users/onboard", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
  })
}
