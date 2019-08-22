<template>
  <el-dialog
    title="登陆"
    :visible.sync="dialogLogin"
    width="35%"
  >
    <el-form label-position="top" label-width="10px" :model="loginForm" size="small">
      <el-form-item label="登陆邮箱">
        <el-input v-model="loginForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登陆</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      jump_url: '',
      dialogLogin: true,
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      let that = this
      this.$axios.post(this.$domain + '/login', this.$qs.stringify(this.loginForm))
        .then(function (res) {
          if (res.data.code === 0) {
            that.jump_url = res.data.data.url
            that.$router.push(that.jump_url)
          } else if (res.data.code === 1001) {
            alert('账号密码错误')
          } else if (res.data.code === 1002) {
            alert('账号不存在')
          } else {
            alert('未知错误')
          }
        }).catch(function (res) {
          console.log(res)
          alert('后端服务异常')
        })
    }
  }
}
</script>

<style scoped>

</style>
