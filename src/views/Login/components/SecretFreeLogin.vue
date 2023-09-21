<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { secreFreeRuleFromType } from '../types/login-type'
import { getSmscodeMethod, SaveUserphone } from '../componsable/index'

const ruleForm = reactive<secreFreeRuleFromType>({
  username: '',
  smscode: '',
  imgcode: '',
  saveUserName: false
})
const imgCodeSrc = ref(new URL('../../../assets/code.png', import.meta.url).href)
const { getSmscode, disabled, smscodeBtn } = getSmscodeMethod()
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
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      if (ruleForm.saveUserName) {
        setUserphone('userPhone', ruleForm.username)
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(() => {
  ruleForm.username = getUserphone('userPhone')
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
      <el-button
        class="smscode-btn"
        type="primary"
        @click="smscodeBtn(ruleForm.username)"
        :disabled="disabled"
        >{{ getSmscode }}</el-button
      >
    </el-form-item>
    <el-form-item prop="imgcode">
      <el-input
        prefix-icon="PictureRounded"
        v-model="ruleForm.imgcode"
        placeholder="请输入图片验证码"
      />
      <img :src="imgCodeSrc" alt="" />
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="ruleForm.saveUserName">记住用户名</el-checkbox>
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
    .smscode-btn {
      width: 127px;
      height: 40px;
    }
    .dl-btn {
      width: 100%;
      height: 40px;
      background-color: #fc5602;
      border: 0;
    }
  }
}
</style>
