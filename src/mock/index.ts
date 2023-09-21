import Mock from 'mockjs'

//导入数据
import user from './userData'

Mock.mock('/api/login/username', (options: { body: string }) => {
  if (!options || !options.body) {
    return {
      code: 101,
      message: '参数为空'
    }
  }
  const params = JSON.parse(options.body)
  if (!params || !params.username || !params.password || !params.imgcode) {
    return {
      code: 101,
      message: '参数为空'
    }
  }
  if (params.username === 'admin' && params.password === '123456') {
    return {
      code: 888,
      message: '',
      data: user.userInfo,
      token: Mock.Random.String(64)
    }
  }
  return {
    code: 102,
    message: '用户名或密码错误'
  }
})
