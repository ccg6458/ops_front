<template>
  <div>
    <el-row>
      <el-col :span="12">
    <el-select v-model="select_list" multiple filterable placeholder="请选择权限" style="width:300px;" >
      <el-option
        v-for="item in business_data['no']"
        :key="item.business_id"
        :label="item.name"
        :value="item.business_id">
      </el-option>
    </el-select>
      </el-col>
    <el-col :span="1" style="margin-bottom: 5px;"></el-col>
      <el-col :span="8">
        <el-button type="primary" @click="grant">确定</el-button></el-col>
    </el-row>
    <el-row>
    </el-row>
    <el-table
      :data="business_data['already']"
      :show-header="false"
      stripe
      :border="true"
      height="480"
      :default-sort = "{prop: 'id'}"
      style="width: 100%">
      <el-table-column
        v-if="false"
        align="center"
        sortable
        prop="business_id"
        width="50"
        label="id">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="name"
        width="300"
        label="项目名">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deletePerm(scope.$index, scope.row)">解除授权</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'GrantForm',
  props: {
    business_data: '',
    user_id: Number
  },
  data () {
    return {
      select_list: []
    }
  },
  methods: {
    grant () {
      let that = this
      this.$axios.post(this.$domain + '/business/modify/' + this.user_id, this.$qs.stringify({'select_list': this.select_list}))
        .then(function (res) {
          if (res.status === 200) {
            that.select_list = []
            that.close_form()
          }
        })
    },
    deletePerm (index, row) {
      let that = this
      this.$axios.delete(this.$domain + '/business/modify/' + this.user_id, {'data': this.$qs.stringify({'business_id': row.business_id})})
        .then(function (res) {
          that.$emit('flashData', that.user_id)
        })
    },
    close_form () {
      this.$emit('change_grant')
    }
  }
}
</script>
<style scoped>
  .el-select {
  }
  .el-row {
    margin-bottom: 40px;
    text-align: left;

  }

</style>
