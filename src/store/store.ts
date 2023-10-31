import { create } from "zustand"

interface TokenStore {
  token: string | null
  clear: () => void
  setToken: (token: string) => void
}

export const useTokenStore = create<TokenStore>(set => ({
  token: null,
  clear: () => set({ token: null }),
  setToken: (token: string) => set(state => ({ token })),
}))

export default { useTokenStore }
