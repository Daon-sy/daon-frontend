import React from "react"

function App() {
  const value = process.env

  return (
    <div className="App">
      <div>{process.env.REACT_APP_TEST_VALUE}</div>
      <div>{value.NODE_ENV}</div>
    </div>
  )
}

export default App
