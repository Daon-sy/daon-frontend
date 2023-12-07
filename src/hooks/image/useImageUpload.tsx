import React from "react"
import axios from "axios"
import { ErrorResponse } from "api"
import { imageUploadApi } from "api/image"
import { useAlert } from "hooks/useAlert"

interface AutoFetchProps {
  autoFetch?: boolean
  fetchCallback?: (imageUrl: string) => void
}

const useImageUpload = () => {
  const { addError } = useAlert()
  const [isFetching, setIsFetching] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const [file, setFile] = React.useState<File>()
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [autoFetchProps, setAutoFetchProps] = React.useState<AutoFetchProps>()
  React.useState<(imageUrl: string) => void>()

  const ImageInput = React.useCallback(
    ({ children }: { children?: React.ReactNode }) => {
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        const inputFile = files?.[0]
        setFile(inputFile)
      }

      return (
        <>
          {children}
          <input
            hidden
            ref={fileInputRef}
            type="file"
            accept="image/jpg,image/jpeg,image/png" // 공통 파일에 분리
            multiple={false}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </>
      )
    },
    [],
  )

  const selectFile = ({ autoFetch = false, fetchCallback }: AutoFetchProps) => {
    setAutoFetchProps({ autoFetch, fetchCallback })
    fileInputRef.current?.click()
  }

  const fetch = async (callback?: (imageUrl: string) => void) => {
    try {
      setIsFetching(true)

      if (!file) {
        addError("이미지를 선택해주세요")
        return
      }

      const { data: responseBody } = await imageUploadApi({ image: file })
      if (callback) callback(responseBody.imageUrl)
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const { response } = e
        setError(response?.data as ErrorResponse)
      }
    } finally {
      setFile(undefined)
      setIsFetching(false)
    }
  }

  React.useEffect(() => {
    if (file && autoFetchProps?.autoFetch) {
      fetch(autoFetchProps.fetchCallback)
      setAutoFetchProps(undefined)
    }
  }, [file, autoFetchProps?.autoFetch])

  return {
    ImageInput,
    file,
    selectFile,
    fetch,
    isFetching,
    error,
  }
}

export default useImageUpload
