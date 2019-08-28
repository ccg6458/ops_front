<template>
  <el-form :model="taskform" label-width="80px">

    <el-form-item label="项目名">
      <el-select v-model="taskform.business_id" placeholder="请选择项目">
        <el-option v-for="business in business_list" v-bind:key="business.id" :label="business.name" :value="business.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="taskform.comment" placeholder="便于查找"></el-input>
    </el-form-item>
    <el-form-item label="执行周期">
      <el-input v-model="taskform.schedule" placeholder="与crontab格式相同"></el-input>
    </el-form-item>
    <el-form-item label="执行命令">
      <el-input type="textarea" v-model="taskform.shell" placeholder="如果程序要跑很久,请放在后台跑,即在命令末尾加 > /dev/null  2>&1 & 或者自定义日志名称"></el-input>
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
  name: 'TaskForm',
  props: {
    taskform: Object,
    action: String,
    business_list: Array
  },
  data () {
    return {
    }
  },
  methods: {
    Create () {
      let that = this
      this.$axios.post(this.$domain + '/task', this.$qs.stringify(this.taskform))
        .then(function (res) {
          if (res.status === 200) {
            that.close_form()
          }
        })
    },
    Update () {
      let that = this
      this.$axios.put(this.$domain + '/task/' + this.taskform.id, this.$qs.stringify(this.taskform))
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
