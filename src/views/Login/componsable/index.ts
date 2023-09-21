import { ref } from 'vue'
import SubData from '@/utils/SubData'
import { ElMessage } from 'element-plus'

//获取验证码倒计时
export function getSmscodeMethod() {
  const getSmscode = ref<string>('获取验证码')
  const disabled = ref<boolean>(false)

  const smscodeBtn = (phone: string) => {
    console.log(phone)

    if (!phone) {
      ElMessage({
        message: '请输入手机号',
        type: 'warning'
      })
      return
    }

    const num = ref(60)
    disabled.value = true
    const timer = setInterval(() => {
      if (num.value <= 50) {
        getSmscode.value = '获取验证码'
        disabled.value = false
        clearInterval(timer)
      } else {
        num.value--
        getSmscode.value = num.value + 's后可重新获取'
      }
    }, 1000)
  }
  return {
    getSmscode,
    disabled,
    smscodeBtn
  }
}

//记住用户名操作
export function SaveUserphone() {
  //存储用户名
  const setUserphone = (sub: string, val?: string) => {
    if (val) {
      //1.将用户手机号存储到本地
      SubData.setData(sub, val)
    } else {
      SubData.removeData(sub)
    }
  }
  //调用用户手机号
  const getUserphone = (key: string) => {
    return SubData.getData(key)
  }
  return { setUserphone, getUserphone }
}
