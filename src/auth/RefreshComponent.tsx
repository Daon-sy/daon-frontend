/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { AxiosResponse } from "axios"
import { basicAxios } from "api"
import { getTokenStore } from "store/getTokenStore"

const RefreshComponent = ({ children }: React.PropsWithChildren) => {
  const BEARER_TYPE = "Bearer "
  const tokenStore = getTokenStore()

  React.useEffect(
    () => () => {
      basicAxios
        .post("/api/auth/reissue")
        .then((res: AxiosResponse) => {
          const { headers } = res.headers
          const authHeader: string = headers.authorization
          if (!!authHeader && authHeader.startsWith(BEARER_TYPE)) {
            const accessToken = authHeader.substring(BEARER_TYPE.length)
            tokenStore.setToken(accessToken)
          }
        })
        .catch(error => error)
    },
    [],
  )

  return <div>{children}</div>
}

export default RefreshComponent
