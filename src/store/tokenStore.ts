import { create } from "zustand"

type reissueState = "FETCHING" | "FETCHED" | "BEFORE_FETCH"

interface TokenStore {
  token: string | null
  clear: () => void
  setToken: (token: string) => void
  isFetchingReissue: reissueState
  setIsFetchingReissue: (isFetchingReissue: reissueState) => void
}

export const getTokenStore = create<TokenStore>(set => ({
  token: null,
  clear: () =>
    set({
      token: null,
    }),
  setToken: (token: string) => set(prev => ({ ...prev, token })),
  isFetchingReissue: "BEFORE_FETCH",
  setIsFetchingReissue: (isFetchingReissue: reissueState) =>
    set(prev => ({ ...prev, isFetchingReissue })),
}))

export default { getTokenStore }
