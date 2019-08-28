<template>
  <div >
    <el-row  style="text-align: left;padding-bottom: 5px;">
      <el-button type="primary"  @click="createTask">新建任务</el-button>
    </el-row>
    <el-dialog
      :title="formname"
      :visible.sync="TaskFormShow"
      width="60%"
    >
      <task-form @change_dialogVisible="changeTaskFormShow" :taskform="taskform" :action="action" :business_list="business_list">test</task-form>
    </el-dialog>
    <el-table
      :data="taskTable"
      stripe
      :border="true"
      height="480"
      :default-sort = "{prop: 'id'}"
      style="width: 100%">
      <el-table-column
        v-if="false"
        align="center"
        sortable
        prop="id"
        width="50"
        label="id">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="business"
        width="150"
        label="项目名">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="schedule"
        width="120"
        label="执行周期">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        prop="shell"
        width="200"
        label="命令">
      </el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        width="250"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="comment"
        width="120"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="getTaskForm(scope.$index,scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import TaskForm from '@/pages/task/TaskForm'

export default {
  name: 'TaskList',
  components: {
    TaskForm
  },
  data () {
    return {
      taskTable: [],
      taskform: {},
      TaskFormShow: false,
      formname: '',
      action: '',
      business_list: []
    }
  },
  methods: {
    deleteTask (index, row) {
      let that = this
      this.$axios.delete(this.$domain + '/task/' + row.id)
        .then(function (res) {
          that.getData()
        }).catch(function () {
        })
    },
    getTaskForm (index, row) {
      this.TaskFormShow = true
      this.action = 'update'
      this.formname = '编辑任务'
      let that = this
      this.$axios.get(this.$domain + '/task/' + row.id)
        .then(function (res) {
          that.taskform = res.data.data
        }).catch(function () {
        })
      this.$axios.get(this.$domain + '/business/only_id')
        .then(function (res) {
          that.business_list = res.data.data
        })
    },
    getData () {
      let that = this
      this.$axios.get(this.$domain + '/task')
        .then(function (res) {
          that.taskTable = res.data.data
        })
    },
    createTask () {
      this.taskform = {}
      this.form = {}
      this.action = 'create'
      this.formname = '新建任务'
      this.TaskFormShow = true
      let that = this
      this.$axios.get(this.$domain + '/business/only_id')
        .then(function (res) {
          that.business_list = res.data.data
        })
    },
    changeTaskFormShow () {
      this.getData()
      this.TaskFormShow = false
    },
    confirmDelete (index, row) {
      this.$confirm('此操作将删除任务' + row.shell + ', 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTask(index, row)
        this.getData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }

  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
  .el-table{
    text-align: center;

  }
  .el-table-column{
    text-align: center;
  }

</style>
