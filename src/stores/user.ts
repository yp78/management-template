import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoginResponseType } from '@/types/user.d'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<LoginResponseType>()
    const token = ref<string>()
    const setToken = (t: string) => {
      token.value = t
    }
    const setUser = (u: LoginResponseType) => {
      userInfo.value = u
    }
    const delToken = () => {
      token.value = ''
    }
    const delUser = () => {
      userInfo.value = undefined
    }
    return {
      userInfo,
      token,
      setToken,
      setUser,
      delToken,
      delUser
    }
  },
  {
    persist: true
  }
)
