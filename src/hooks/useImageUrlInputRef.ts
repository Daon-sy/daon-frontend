import React from "react"

/**
 * ref: 대상 input 태그의 ref prop에 할당
 * changeRef: ref가 할당된 input 태그의 value를 변경하면서 change 이벤트를 발생
 */
const useImageUrlInputRef = () => {
  const ref = React.useRef<HTMLInputElement>(null)
  const changeRef = (value: string) => {
    ref.current?.setAttribute("value", value)
    ref.current?.dispatchEvent(new Event("change", { bubbles: true }))
  }

  return [ref, changeRef] as const
}

export default useImageUrlInputRef
