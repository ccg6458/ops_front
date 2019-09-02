<template>
  <div >
    <el-row  style="text-align: left;padding-bottom: 5px;">
      <el-button type="primary"  @click="createAsset">新增用户</el-button>
    </el-row>
    <el-dialog
      :title="formname"
      :visible.sync="dialogVisible"
      width="35%"
    >
      <user-form @change_dialogVisible="changeUserShow" :form="form" :action="action">test</user-form>
    </el-dialog>

    <el-dialog
      :title="grantname"
      :visible.sync="grantVisible"
      width="50%"

    >
      <grant-form @flashData="flashData" @change_grant="changeFormShow" :business_data="business_data" :user_id="user_id" >test</grant-form>
    </el-dialog>
    <el-table
      :data="tableData"
      ref="multipleTable"
      stripe
      :border="true"
      height="480"
      :default-sort = "{prop: 'id'}"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
        prop="name"
        width="150"
        label="用户名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="email"
        width="300"
        label="登录邮箱">
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        width="80"
        :formatter="formatStatus"
        label="状态">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="getForm(scope.$index,scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="confirmDelete(scope.$index, scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.super===0"
            @click="grantForm(scope.$index, scope.row)">授权</el-button>
          <el-button
            size="mini"
            type="info"
            v-if="scope.row.super===1"
            disabled>超管</el-button>

        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import UserForm from '@/pages/user/UserForm'
import GrantForm from '@/pages/permission/GrantForm'

export default {
  name: 'UserList',
  components: {
    UserForm,
    GrantForm
  },
  data () {
    return {
      dialogVisible: false,
      grantVisible: false,
      tableData: [],
      multipleSelection: [],
      form: {
      },
      grantform: {
      },
      action: '',
      formname: '',
      grantname: '',
      business_data: '',
      user_id: ''
    }
  },
  methods: {
    deleteUser (index, row) {
      let that = this
      this.$axios.delete(this.$domain + '/test/' + row.id)
        .then(function (res) {
          that.getAllData()
        }).catch(function () {
        })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    changeFormShow () {
      this.getAllData()
      this.grantVisible = false
    },
    changeUserShow () {
      this.getAllData()
      this.dialogVisible = false
    },
    createAsset () {
      this.form = {}
      this.action = 'create'
      this.dialogVisible = true
      this.formname = '新建用户'
    },
    getForm (index, row) {
      let that = this
      this.$axios.get(this.$domain + '/test/' + row.id)
        .then(function (res) {
          that.form = res.data.data
        }).catch(function () {
        })
      this.dialogVisible = true
      this.action = 'update'
      this.formname = '编辑用户'
    },
    grantForm (index, row) {
      this.business_data = ''
      let that = this
      this.$axios.get(this.$domain + '/business/business_grant/' + row.id)
        .then(function (res) {
          that.business_data = res.data.data
        }).catch(function () {
        })
      this.grantVisible = true
      this.user_id = row.id
      this.grantname = '用户<' + row.name + '>授权'
    },
    flashData (data) {
      this.business_data = ''
      let that = this
      this.$axios.get(this.$domain + '/business/business_grant/' + data)
        .then(function (res) {
          that.business_data = res.data.data
        }).catch(function () {
        })
    },
    getAllData () {
      let that = this
      this.$axios.get(this.$domain + '/test/all')
        .then(function (res) {
          that.tableData = res.data.data
        })
    },
    formatSex (row) {
      let sex = row.sex
      if (sex === 1) {
        return '男'
      } else {
        return '女'
      }
    },
    formatStatus (row) {
      let status = row.status
      if (status === 1) {
        return '激活'
      } else {
        return '禁用'
      }
    },
    confirmDelete (index, row) {
      this.$confirm('此操作将删除用户 ' + row.name + ' , 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(index, row)
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
    this.getAllData()
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
