import { create } from "zustand"

interface TokenStore {
  token: string | null
  clear: () => void
  setToken: (token: string) => void
}

export const getTokenStore = create<TokenStore>(set => ({
  token:
    // "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9NRU1CRVIiLCJzdWIiOiI3OGNmYjlmNi1lYzQwLTRlYzctYjViZC1iNzY1NGZhMDE0ZjgiLCJpYXQiOjE2OTk2OTQwMDIsImV4cCI6MTE2OTk2OTQwMDF9.mZ0-isdxBL-pWS5woqiqdWj-qo_yQFpFIMUyL3TOBaA",
    null,
  clear: () =>
    set({
      token: null,
    }),
  setToken: (token: string) => set(() => ({ token })),
}))

export default { getTokenStore }
