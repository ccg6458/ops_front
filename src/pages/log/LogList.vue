<template>
  <div >
    <el-table
      :data="logData"
      stripe
      :border="true"
      height="480"
      :default-sort = "{prop: 'create_time', order: 'descending'}"
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
        prop="username"
        width="240"
        label="用户名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="behavior"
        width="720"
        label="用户行为">
      </el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        width="160"
        label="操作时间">
      </el-table-column>
    </el-table>
    <el-pagination
      :background="true"
      @size-change="changeSize"
      @current-change="curretPage"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: 'LogList',
  data () {
    return {
      logData: [],
      totalCount: 100,
      pageNum: 1,
      pageSize: 10
    }
  },
  methods: {
    getAllData () {
      let that = this
      this.$axios.get(this.$domain + '/log')
        .then(function (res) {
          that.logData = res.data.data
        })
    },
    getDataByPage () {
      let that = this
      this.$axios.get(this.$domain + '/log?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum)
        .then(function (res) {
          that.totalCount = res.data.data['total']
          that.logData = res.data.data['log']
        })
    },
    changeSize (val) {
      this.pageSize = val
      this.getDataByPage()
    },
    curretPage (val) {
      this.pageNum = val
      this.getDataByPage()
    }

  },
  mounted () {
    this.getDataByPage()
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
