import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { getTokenStore } from "../store/tokenStore"

function Landing() {
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const { setToken } = getTokenStore()

  React.useEffect(() => {
    const testToken = searchParams.get("testToken")
    if (testToken) {
      setToken(testToken)
      navigate("/")
    }
  }, [])

  return (
    <div>
      <h1>landing</h1>
    </div>
  )
}
export default Landing
