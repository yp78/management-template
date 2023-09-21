<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { secreFreeRuleFromType } from '../types/login-type'
import { SaveUserphone } from '../componsable/index'
import { accountLogin } from '@/Api/user'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()
const ruleForm = reactive<secreFreeRuleFromType>({
  username: '',
  smscode: '',
  imgcode: '',
  saveUserName: false,
  saveUserPassword: false
})
const imgCodeSrc = ref(new URL('../../../assets/code.png', import.meta.url).href)
const { setUserphone, getUserphone } = SaveUserphone()

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules<secreFreeRuleFromType>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  smscode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }],
  imgcode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!')
      if (ruleForm.saveUserName) {
        setUserphone('userName', ruleForm.username)
      }
      if (ruleForm.saveUserPassword) {
        setUserphone('userPassword', ruleForm.username)
      }
      const res = await accountLogin({
        username: ruleForm.username,
        password: ruleForm.smscode,
        imgcode: ruleForm.imgcode
      })

      if (res.code === 888) {
        store.setToken(res.token!)
        store.setUser(res.data!)

        // 跳转到主页
        router.push('/')
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(() => {
  ruleForm.username = getUserphone('userName')
})
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
  >
    <el-form-item prop="username">
      <el-input prefix-icon="UserFilled" v-model="ruleForm.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item prop="smscode">
      <el-input prefix-icon="Picture" v-model="ruleForm.smscode" placeholder="请输入短信验证码" />
    </el-form-item>
    <el-form-item prop="imgcode">
      <el-input
        prefix-icon="PictureRounded"
        v-model="ruleForm.imgcode"
        placeholder="请输入图片验证码"
      />
      <img :src="imgCodeSrc" alt="" />
    </el-form-item>
    <el-form-item class="from-btn">
      <el-checkbox v-model="ruleForm.saveUserName">记住用户名</el-checkbox>
      <el-checkbox v-model="ruleForm.saveUserPassword">记住密码</el-checkbox>
      <span>忘记密码？</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" round class="dl-btn" @click="submitForm(ruleFormRef)">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.el-form {
  padding: 0;
  .el-form-item {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: space-between;
    .el-input {
      flex: 1;
      height: 40px;
      margin-right: 10px;
    }
    .dl-btn {
      width: 100%;
      height: 40px;
      background-color: #fc5602;
      border: 0;
    }
  }
}
.from-btn {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
