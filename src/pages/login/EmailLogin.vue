<template>
  <el-dialog
    title="邮箱登陆"
    :visible.sync="dialogLogin"
    width="35%"
  >
    <el-form label-position="top" label-width="10px" :model="loginForm" size="small" style="text-align: left;">
      <el-form-item label="登陆邮箱">
        <el-input v-model="loginForm.email" placeholder="请输入公司邮箱 xxx@mifengkong.cn"></el-input>
      </el-form-item>

      <el-form-item label="验证码">
        <el-row>
          <el-col :span="12">
        <el-input v-model="loginForm.code"></el-input>
          </el-col>
        <el-col :span="1" style="margin-bottom: 1px;"></el-col>
          <el-col :span="4">
            <el-button type="primary" @click="sendMsg" :disabled="isDisabled">{{buttonName}}</el-button>
          </el-col>
        </el-row>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login" size="big">登陆</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'EmailLogin',
  data () {
    return {
      jump_url: '',
      dialogLogin: true,
      loginForm: {
        email: '',
        code: ''
      },
      isDisabled: false,
      buttonName: '发送验证码至邮箱',
      time: 120
    }
  },
  methods: {
    login () {
      if (this.loginForm.email.trim().length === 0 || this.loginForm.code.trim().length === 0) {
        alert('请输入登陆信息')
        return
      }
      let that = this
      this.$axios.post(this.$domain + '/emaillogin', this.$qs.stringify(this.loginForm))
        .then(function (res) {
          if (res.data.code === 0) {
            that.jump_url = res.data.data.url
            that.$router.push(that.jump_url)
          } else {
            alert(res.data.message())
          }
        }).catch(function (res) {
          console.log(res)
          alert('后端服务异常')
        })
    },
    sendMsg () {
      if (this.loginForm.email === '') {
        alert('请输入邮箱')
        return
      }
      let that = this
      this.$axios.post(this.$domain + '/sendmsg', this.$qs.stringify(this.loginForm))
        .then(function (res) {
          if (res.data.code === 0) {
            that.isDisabled = true
            let interval = window.setInterval(function () {
              that.buttonName = '（' + that.time + '秒）后重新发送'
              --that.time
              if (that.time < 0) {
                that.buttonName = '重新发送'
                that.time = 120
                that.isDisabled = false
                window.clearInterval(interval)
              }
            }, 1000)
          } else {
            alert(res.data.message)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
