import type { LoginResponseType, accountLoginType } from '@/types/user'
import request from '@/utils/request'

export const accountLogin = (data: accountLoginType) => {
  return request<LoginResponseType>({ url: '/api/login/username', method: 'POST', data })
}
