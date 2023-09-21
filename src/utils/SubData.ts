import { ElMessage } from 'element-plus'
const SubData = {
  //存数据
  setData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  //获取数据
  getData(key: string) {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }
  },
  //删除数据
  removeData(key: string) {
    localStorage.removeItem(key)
  },
  //开启全局loading
  //关闭全局loading
  //成功信息提示
  showSuccess(message: string) {
    return ElMessage({
      message: message,
      type: 'success'
    })
  },
  //错误信息提示
  showError(message: string) {
    return ElMessage.error(message)
  },
  //警告信息提示
  showWarning(message: string) {
    return ElMessage({
      message: message,
      type: 'warning'
    })
  },
  //展示消息提示
  showInfo(message: string) {
    return ElMessage(message)
  },
  //关闭所有消息提示
  closeMsg() {
    ElMessage.closeAll()
  }
}
export default SubData
