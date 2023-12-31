import { AxiosResponse } from "axios"
import { authAxios, basicAxios } from "api/index"
import { MemberDetail, MemberEmail, MemberSettings } from "_types/member"

export const MEMBER_API_PREFIX = "/api/members"
export const EMAIL_API_PREFIX = "/api/emails/verification"

// ========== REQUEST ===========
export interface SignUpRequestBody {
  username: string
  email: string
  name: string
  password: string
}

export interface ModifyMyMemberInfoRequestBody {
  name?: string
  newPassword?: string
  prevPassword: string
}

export interface AddEmailRequestBody {
  email: string
}

export interface SendVerificationEmailRequestBody {
  email: string
}

export interface CheckVerificationEmailRequestBody {
  email: string
  code: string
}

export interface CheckEmailRequestBody {
  email: string
}

// ========== RESPONSE ==========
export type MyMemberDetailResponseBody = MemberDetail

export interface MyEmailsResponseBody {
  totalCount: number
  memberEmails: Array<MemberEmail>
}

export interface CheckVerificationEmailResponseBody {
  verified: boolean
}

// ========== API ==========
export const signUpApi = async (
  requestBody: SignUpRequestBody,
): Promise<AxiosResponse> => {
  return basicAxios.post(`${MEMBER_API_PREFIX}/sign-up`, requestBody)
}

export const myMemberDetailApi = async (): Promise<
  AxiosResponse<MyMemberDetailResponseBody>
> => {
  return authAxios.get(`${MEMBER_API_PREFIX}/me`)
}

export const modifyMyMemberInfoApi = async (
  requestBody: ModifyMyMemberInfoRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.patch(`${MEMBER_API_PREFIX}/me`, requestBody)
}

export const withdrawApi = async (): Promise<AxiosResponse> => {
  return authAxios.delete(`${MEMBER_API_PREFIX}/me`)
}

export const myEmailsApi = async (): Promise<
  AxiosResponse<MyEmailsResponseBody>
> => {
  return authAxios.get(`${MEMBER_API_PREFIX}/me/emails`)
}

export const addEmailApi = async (
  requestBody: AddEmailRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.post(`${MEMBER_API_PREFIX}/me/emails`, requestBody)
}

export const removeEmailApi = async (
  memberEmailId: number,
): Promise<AxiosResponse> => {
  return authAxios.delete(`${MEMBER_API_PREFIX}/me/emails/${memberEmailId}`)
}

export const sendVerificationEmailApi = async (
  requestBody: SendVerificationEmailRequestBody,
): Promise<AxiosResponse> => {
  return basicAxios.post(`${EMAIL_API_PREFIX}/send`, requestBody)
}

export const checkVerificationEmailApi = async (
  requestBody: CheckVerificationEmailRequestBody,
): Promise<AxiosResponse<CheckVerificationEmailResponseBody>> => {
  return authAxios.post(`${EMAIL_API_PREFIX}/check`, requestBody)
}

export const checkEmailApi = async (
  requestBody: CheckEmailRequestBody,
): Promise<AxiosResponse> => {
  return basicAxios.post(`${EMAIL_API_PREFIX}/check`, requestBody)
}

export interface ModifyMemberSettingsRequestBody {
  notified: boolean
}

export const modifyMemberSettingsApi = async (
  requestBody: ModifyMemberSettingsRequestBody,
): Promise<AxiosResponse> => {
  return authAxios.post("/api/members/settings", requestBody)
}

export type MemberSettingsResponseBody = MemberSettings

export const memberSettingsApi = async (): Promise<
  AxiosResponse<MemberSettingsResponseBody>
> => {
  return authAxios.get("/api/members/settings")
}
export const checkUsernameApi = async (
  username: string,
): Promise<AxiosResponse> => {
  return basicAxios.post(`${MEMBER_API_PREFIX}/username`, {
    username,
  })
}
