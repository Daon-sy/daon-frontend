import { create } from "zustand"

interface TokenStore {
  token: string | null
  clear: () => void
  setToken: (token: string) => void
}

export const getTokenStore = create<TokenStore>(set => ({
  token:
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9NRU1CRVIiLCJzdWIiOiI3OGNmYjlmNi1lYzQwLTRlYzctYjViZC1iNzY1NGZhMDE0ZjgiLCJpYXQiOjE3MDExNDkxMTUsImV4cCI6MTcwMTIwOTExNX0.dj5XtjhJKkv036Sh5Gz9H10CQKSJdxvTgrrBaqEh_PE",
  clear: () =>
    set({
      token: null,
    }),
  setToken: (token: string) => set(() => ({ token })),
}))

export default { getTokenStore }
