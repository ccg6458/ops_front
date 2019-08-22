import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userid: 0
  },
  mutations: {
    changeuserid (state, userid) {
      state.userid = userid
    }
  }
})
