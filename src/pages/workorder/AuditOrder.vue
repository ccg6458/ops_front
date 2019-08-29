<template>
  <div style="text-align: left;">
    <div v-html="sql" >
    </div>
    <div>-----------------------------------------</div>
    <div style="margin-bottom: 10px;color: red">{{comment}}</div>
    <el-button type="primary" @click="pass">通过</el-button>
    <el-button type="danger"  @click="cancel">取消</el-button>

  </div>

</template>

<script>
export default {
  name: 'AuditOrder',
  props: {
    sql: '',
    id: '',
    comment: ''
  },
  methods: {
    pass () {
      let that = this
      this.$axios.put(this.$domain + '/work/audit', this.$qs.stringify({'id': this.$props.id}))
        .then(function (res) {
          if (res.data.code === 0) {
            that.$emit('change_AuditOrderShow')
          }
        })
    },
    cancel () {
      this.$emit('change_AuditOrderShow')
    }
  }

}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

</style>
