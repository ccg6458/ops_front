<template>
  <el-form :model="workorderform" :rules="rules" label-width="100px" style="text-align: left;">
    <el-form-item  label="标题" prop="name">
      <el-input    placeholder="标题" v-model="workorderform.name">
      </el-input>
    </el-form-item>
    <el-form-item  label="简要说明">
      <el-input    type="textarea" autosize placeholder="用于审核参考，建表等简单sql可不写" v-model="workorderform.comment">
      </el-input>
    </el-form-item>
    <el-form-item  label="sql语句" >
      <el-input    type="textarea"   v-model="workorderform.sql" placeholder="sql语句注意带上正确的库名,
sql之间以英文分号隔开,
注意删除注释行,
目前只有建表语句的sql能免审核执行,
若是建表同时需要建索引,请在建表语句内使用KEY语法代替,
避免因为单独的create key或者alter table语法导致语句需要审核">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button  type="primary" @click="Create">提交工单</el-button>

      <el-button @click="close_form">取消</el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  name: 'WorkOrderForm',
  props: {
    workorderform: '',
    action: String,
    database_list: ''
  },
  data () {
    return {
      type_list: [
        {'id': 1, 'name': 'sql执行'}
        // {'id': 2, 'name': '域名配置'},
        // {'id': 3, 'name': '其他'}
      ],
      rules: {
        name: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    Create () {
      if (this.workorderform.sql.indexOf('#') !== -1 ||
        this.workorderform.sql.indexOf('/') !== -1) {
        alert('请删除注释行')
        return
      }

      let that = this
      this.$axios.post(this.$domain + '/work', this.$qs.stringify(this.workorderform))
        .then(function (res) {
          if (res.data.code === 0) {
            that.close_form()
          } else { alert(res.data.message) }
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
<style>
  .el-textarea__inner{
    height: 222px;
  }
  .el-form{
    padding: 0px !important;
  }
</style>
