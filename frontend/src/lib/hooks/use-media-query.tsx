"use client"

import { useState, useEffect } from "react"

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

export const useIsScreenSm = () => {
  return useMediaQuery("(max-width: 640px)")
}

export const useIsScreenMd = () => {
  return useMediaQuery("(max-width: 768px)")
}

export const useIsScreenLg = () => {
  return useMediaQuery("(max-width: 1024px)")
}

export const useIsScreenXl = () => {
  return useMediaQuery("(min-width: 1280px)")
}
