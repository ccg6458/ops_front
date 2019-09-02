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
          that.getAllData()
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
    getAllData () {
      let that = this
      this.$axios.get(this.$domain + '/business')
        .then(function (res) {
          that.tableData = res.data.data
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
