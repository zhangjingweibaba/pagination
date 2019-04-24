<template>
    <div class="page-wrap">
      <ul v-show="prePage" class="li-page" v-tap="{methods: goPrePage}">上一页</ul>
      <ul>
        <li v-for="i in showPageBtn" :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}"
            v-tap="{methods: goPage, i: i}">
          <a v-if="i" class="notPointer">{{i}}</a>
          <a v-else>···</a>
        </li>
      </ul>
      <ul v-show="nextPage" class="li-page" v-tap="{methods: goNextPage}">下一页</ul>
    </div>
</template>
<script>
let that
export default{
    data(){
        that = this
        return{
            num: 60,//总数
            limit: 5//每个页的个数
        }
    },
    computed: {
        totalPage() {// 应该等于需显示的总数除以每页显示的个数
            return Math.ceil(that.num / that.limit)
        },
        offset() { //获取偏移量
            return that.$store.state.offset
        },
        currentPage() {//当前页面
            return Math.ceil(that.offset / that.limit) + 1
        },
        prePage() { //上一页面是否需要显示
            return that.offset !== 0 && that.num
        },
        nextPage() {//下一页是否需要显示
            return (that.offset + that.limit < that.num) && that.num
        },
        showPageBtn() {
            let pageNum = that.totalPage,//页数
                index = that.currentPage,//当前页面
                arr = [];
            if (pageNum <= 5) {
                for(let i = 1; i <= pageNum; i++) {
                    arr.push(i)
                }
                return arr
            }
            if (index <= 2) return [1,2,3,0,pageNum]
            if (index >= pageNum -1) return [1,0, pageNum -2, pageNum -1, pageNum]
            if (index === 3) return [1,2,3,4,0,pageNum]
            if (index === pageNum -2) return [1,0, pageNum-3, pageNum-2, pageNum-1, pageNum]
            return [1,0, index-1, index, index + 1, 0, pageNum]
        }
    },
    methods: {
        goPage(params) {
            console.log(params)
            if (params.i === 0 || params.i === that.currentPage) return
            that.$store.commit('GO_PAGE', (params.i-1) * that.limit)
            that.$emit('getNew')
        },
        goPrePage() {
            that.$store.commit('PRE_PAGE', that.limit)
            that.$emit('getNew')
        },
        goNextPage() {
            that.$store.commit('NEXT_PAGE', that.limit)
            that.$emit('getNew')
        }
    }
}  
</script>
<style scoped>
*{
    padding: 0px;
    margin: 0px;
    text-decoration: none;
    list-style: none;
}
.page-wrap{
    width: 500px;
    height: 50px;
    margin: 0 auto;
    border: 1px solid #e0e00e;
}
.page-wrap ul{
    float: left;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
}
.page-wrap ul li{
    float: left;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #000000;
    cursor: pointer;
}
.page-wrap ul li.active{
    color: #d23a58;
    font-weight: bold;
}
</style>
