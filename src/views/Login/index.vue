<script setup lang="ts">
import { ref } from 'vue'
import { SecretFreeLogin, ScanCodeLogin, AccountLogin } from './components/index'
const active = ref(0)
const changeNav = (index: number) => {
  active.value = index
}
const tabnavs = [
  {
    title: '免密登录',
    componentName: SecretFreeLogin
  },
  {
    title: '账号登录',
    componentName: ScanCodeLogin
  },
  {
    title: '扫码登录',
    componentName: AccountLogin
  }
]
</script>

<template>
  <div class="login-page">
    <div class="login">
      <div class="img"></div>
      <div class="login-right">
        <div class="tabnav">
          <span
            :class="{ selected: active == index }"
            v-for="(item, index) in tabnavs"
            :key="index"
            @click="changeNav(index)"
            >{{ item.title }}</span
          >
        </div>
        <component :is="tabnavs[active].componentName"></component>
      </div>
    </div>
    <div class="login-footer">版权所有: 通用管理系统</div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(#1e82b7, #3eee87, #1e82b7);
  position: relative;
  .login {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 0 20px 5px #262626;
    display: flex;
    .img {
      width: 40%;
      height: 100%;
      border-right: 2px solid #ccc;
    }
    .login-right {
      flex: 1;
      padding: 35px 20px;
      .tabnav {
        width: 100%;
        display: flex;
        font-weight: 600;
        justify-content: space-between;
        margin-bottom: 20px;
        span {
          flex: 1;
          text-align: center;
          cursor: pointer;
          &.selected,
          &:hover {
            color: red;
          }
        }
      }
    }
  }
  .login-footer {
    position: absolute;
    bottom: 40px;
    left: 50%;
    color: #fff;
    transform: translateX(-50%);
  }
}
</style>
