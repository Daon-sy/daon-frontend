import { ApiResponse, authAxios } from "api/index"
import { AxiosResponse } from "axios"

export interface ImageUploadRequest {
  image: File
}

export interface ImageUploadResponse {
  imageUrl: string
}

export const imageUploadApi = async (
  request: ImageUploadRequest,
): Promise<AxiosResponse<ApiResponse<ImageUploadResponse>>> => {
  const axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
  const formData = new FormData()
  formData.append("image", request.image)

  return authAxios.post("/api/images", formData, axiosConfig)
}
