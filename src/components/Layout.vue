<template>
  <div>
    <el-container>
      <el-header  v-if="showside">
        <el-row>
          <el-col :span="2">标题待定</el-col>
          <el-col :span="21">测试</el-col>
          <el-col :span="1" class="right"><el-button type="danger" size="mini" @click="logout">登出</el-button></el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside  v-if="showside" width="100px">
          <el-menu  :default-openeds="['1']" >
          <router-link v-for="side in sidetable" v-bind:key="side.id" :to="side.routelink">
            <el-menu-item  :index="side.index">
              <template ><i :class="side.icon"></i>{{side.tab}}</template>
            </el-menu-item>
          </router-link>
        </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <router-view>
            </router-view>
          </el-main>
          <el-footer v-if="showside">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      sidetable: [],
      showside: Boolean
    }
  },
  methods: {
    initLayout () {
      if (this.$route.path === '/login') {
        this.showside = false
      } else {
        let that = this
        this.$axios.get(this.$domain + '/sidebar')
          .then(function (res) {
            if (res.data.code === 0) {
              that.sidetable = res.data.data
              that.showside = true
            } else if (res.data.code === 1000) {
              that.$router.push('/login')
            }
          }
          ).catch(function () {
            alert('未知错误')
          })
      }
    },
    logout () {
      let that = this
      this.$axios.get(this.$domain + '/logout')
        .then(function () {
          that.$router.push('/login')
        })
    }
  },
  mounted () {
    this.initLayout()
  },
  watch: {
    $route: function () {
      this.initLayout()
    }
  }
}

</script>

<style scoped>
  .el-header{
    text-align: left;
    background-color: #B3C0D1;
    line-height: 60px;
    color: lightseagreen;
  }
  .el-main{
    min-height: 480px;
  }
  .el-aside {
    color: #333;
  }
  .el-footer {
    line-height: 30px;
    height: 30px !important;

  }
  .el-menu-item {
    padding-left: 0px !important;
    padding-right: 10px;
  }

</style>
