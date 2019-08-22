<template>
  <el-form :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="登录邮箱">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item v-if="this.action=='create'" label="密码">
      <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="form.status" >
        <el-option label="激活" value=1></el-option>
        <el-option label="禁用" value=0></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button v-if="this.action=='create'" type="primary" @click="Create">创建</el-button>
      <el-button v-if="this.action=='update'" type="primary" @click="Update">更新</el-button>
      <el-button @click="close_form">取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    form: Object,
    action: String

  },
  data () {
    return {
    }
  },
  methods: {
    Create () {
      let that = this
      this.$axios.post(this.$domain + '/test/', this.$qs.stringify(this.form))
        .then(function (res) {
          if (res.data.code === 0) {
            that.close_form()
          } else if (res.data.code === 1003) {
            alert(res.data.message)
          }
        })
    },
    Update () {
      let that = this
      this.$axios.put(this.$domain + '/test/' + this.form.id, this.$qs.stringify(this.form))
        .then(function (res) {
          if (res.status === 200) {
            that.close_form()
          }
        }).catch(function () {
        })
    },
    close_form () {
      this.$emit('change_dialogVisible')
    }
  },
  computed: {
  }
}
</script>
