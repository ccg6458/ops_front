<template>
  <div >
    <el-table
      :data="logData"
      stripe
      :border="true"
      height="480"
      :default-sort = "{prop: 'id', order: 'descending'}"
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
        prop="username"
        width="150"
        label="用户名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="behavior"
        width="300"
        label="用户行为">
      </el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        width="300"
        label="操作时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'LogList',
  data () {
    return {
      logData: []
    }
  },
  methods: {
    getdata () {
      let that = this
      this.$axios.get(this.$domain + '/log')
        .then(function (res) {
          that.logData = res.data.data
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
