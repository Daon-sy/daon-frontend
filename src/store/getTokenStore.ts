import { create } from "zustand"

interface TokenStore {
  token: string | null
  clear: () => void
  setToken: (token: string) => void
}

export const getTokenStore = create<TokenStore>(set => ({
  token: null,
  clear: () => set({ token: null }),
  setToken: (token: string) => set(() => ({ token })),
}))

export default { getTokenStore }
