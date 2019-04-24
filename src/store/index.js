// vuex store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const PRE_PAGE = 'PRE_PAGE'
const NEXT_PAGE = 'NEXT_PAGE'
const GO_PAGE = 'GO_PAGE'


const state = {
    offset: 0
}
const mutations ={
    //上一页
    [PRE_PAGE] (state, offset) {
        state.offset -= offset
    },
    // 分页 下一页
    [NEXT_PAGE] (state, offset) {
    state.offset += offset
    },
    // 分页 跳转到指定页码
    [GO_PAGE] (state, offset) {
    state.offset = offset
    }
}
 
export default new Vuex.Store({
    state,
    mutations
})