<template>
  <div >
    <el-table
      :data="tableData"
      stripe
      :border="true"
      height="480"
      :default-sort = "{prop: 'id'}"
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
        label="项目名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="host"
        width="300"
        label="执行主机">
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
            @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'BusinessList',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    deleteUser (index, row) {
      let that = this
      this.$axios.delete(this.$domain + '/business/' + row.id)
        .then(function (res) {
          that.getdata()
        }).catch(function () {
        })
    },
    getForm (index, row) {
      let that = this
      this.$axios.get(this.$domain + '/business/' + row.id)
        .then(function (res) {
          that.form = res.data.data
        }).catch(function () {
        })
    },
    getdata () {
      let that = this
      this.$axios.get(this.$domain + '/business')
        .then(function (res) {
          that.tableData = res.data.data
        })
    }

  },
  mounted () {
    this.getdata()
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
