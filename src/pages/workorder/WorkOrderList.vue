<template>
  <div>
    <el-row style="text-align: left;padding-bottom: 5px;">
      <el-button type="primary" @click="createOrder">新建sql工单</el-button>
    </el-row>
    <el-dialog
      :title="formname"
      :visible.sync="WorkOrderFormShow"
      width="50%"
    >
      <work-order-form @change_dialogVisible="changeWorkOrderShow" :workorderform="workorderform" :action="action">test</work-order-form>
    </el-dialog>
    <el-dialog
      :title="auditname"
      :visible.sync="AuditOrderShow"
      width="40%"
    >
      <audit-order @change_AuditOrderShow="changeAuditOrderShow" :sql="auditSql" :id="auditId" :comment="auditComment">
        test
      </audit-order>
    </el-dialog>
    <el-table
      :data="WorkOrderTable"
      stripe
      :border="true"
      :default-sort="{prop: 'create_time', order: 'descending'}"
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
        width="120"
        label="上线发起人">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        prop="name"
        width="100"
        label="标题">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        prop="sql"
        width="160"
        type="text"
        label="sql详情">
      </el-table-column>
      <el-table-column
        align="center"
        prop="create_time"
        width="240"
        label="创建时间">
      </el-table-column>
      <el-table-column
        :filters="[{ text: '未审核', value: 0 },{text: '通过',value:1} ,{ text: '自动审核', value: 2 }]"
        :filter-method="filterAudit"
        align="center"
        prop="audit"
        width="80"
        :formatter="audit_msg"
        label="审核状态">
      </el-table-column>
      <el-table-column
        align="center"
        prop="finish"
        width="80"
        :formatter="finish_msg"
        label="执行状态">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        align="center"
        prop="result"
        width="100"
        label="执行结果">
      </el-table-column>
      <el-table-column
        v-if="false"
        align="center"
        prop="comment"
        width="80"
        label="备注">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            v-if="showEditButton(scope.$index,scope.row)"
            size="mini"
            type="primary"
            @click="EditOrder(scope.$index,scope.row)">编辑
          </el-button>
          <el-button
            v-if="showAuditButton(scope.$index,scope.row)"
            size="mini"
            type="primary"
            @click="confirmAudit(scope.$index,scope.row)">审核
          </el-button>
          <el-button
            v-if="showExecuteButton(scope.$index,scope.row)"
            size="mini"
            type="primary"
            @click="executeAgain(scope.$index,scope.row)">再次执行
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import WorkOrderForm from '@/pages/workorder/WorkOrderForm'
import AuditOrder from '@/pages/workorder/AuditOrder'

export default {
  name: 'WorkOrderList',
  components: {
    AuditOrder,
    WorkOrderForm
  },
  data () {
    return {
      WorkOrderTable: [],
      workorderform: {},
      WorkOrderFormShow: false,
      AuditOrderShow: false,
      formname: '',
      auditname: '',
      action: '',
      super: 0,
      auditSql: '',
      auditId: '',
      auditComment: ''
    }
  },
  methods: {
    getData () {
      let that = this
      this.$axios.get(this.$domain + '/work')
        .then(function (res) {
          that.WorkOrderTable = res.data.data['work']
          that.super = res.data.data['super']
        })
    },
    createOrder () {
      this.workorderform = {}
      this.form = {}
      this.action = 'create'
      this.formname = '新建工单'
      this.WorkOrderFormShow = true
    },
    EditOrder (index, row) {
      this.WorkOrderFormShow = true
      this.action = 'update'
      this.formname = '编辑工单'
      let that = this
      this.$axios.get(this.$domain + '/work/item?id=' + row.id)
        .then(function (res) {
          that.workorderform = res.data.data
        }).catch(function () {
        })
    },
    changeWorkOrderShow () {
      this.getData()
      this.WorkOrderFormShow = false
    },
    changeAuditOrderShow () {
      this.getData()
      this.AuditOrderShow = false
    },
    confirmAudit (index, row) {
      var sql = row.sql.replace(/\n/g, '<br/>')
      this.auditSql = sql
      this.auditId = row.id
      this.AuditOrderShow = true
      this.auditname = 'sql审核'
      this.auditComment = row.comment
    },
    executeAgain (index, row) {
      let that = this
      this.$axios.put(this.$domain + '/work/execute', this.$qs.stringify({'id': row.id}))
        .then(function (res) {
          alert(res.data.message)
          that.getData()
        })
    },
    audit_msg (row) {
      let audit = row.audit
      if (audit === 0) {
        return '未审核'
      } else if (audit === 1) {
        return '通过'
      } else if (audit === 2) {
        return '自动审核'
      }
    },
    finish_msg (row) {
      let finish = row.finish
      if (finish === 0) {
        return '未完成'
      } else {
        return '完成'
      }
    },
    filterAudit (value, row) {
      return row.audit === value
    },
    showEditButton (index, row) {
      if (row.finish === 0) {
        return true
      } else {
        return false
      }
    },
    showAuditButton (index, row) {
      if (this.super === 1 && row.audit === 0) {
        return true
      } else {
        return false
      }
    },
    showExecuteButton (index, row) {
      if (this.super === 1 && row.finish === 0 && row.audit === 1) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style scoped>
  .el-table {
    text-align: center;

  }

  .el-table-column {
    text-align: center;
  }

  .el-dialog__body {
    padding-left: 10px !important;
    padding-right: 10px;
    overflow: auto
  }

  .el-tooltip__popper.is-dark {
    background: #f5f7fa !important;
    color: #66b1ff !important;
    width: 300px !important;
  }

</style>
