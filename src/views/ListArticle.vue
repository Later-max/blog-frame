<template>
  <div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题" width="250" >
      </el-table-column>
      <el-table-column prop="body" label="内容" width="220">
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small" :model="article">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "ListArticle",
    data() {
      return {
        articles:[],
      }
    },
    methods:{
      fetch(){
        this.$http.get('articles').then(res=>{
          this.articles = res.data
        })
      },
      edit(id){
        this.$router.push(`/articles/${id}/edit`)
      },
      remove(id){
        this.$http.delete(`articles/${id}`).then(res=>{
          this.$message({
            message: '文章删除成功',
            type: 'success'
          });
          this.fetch()
          console.log(res);
        })
      }
    },
    created() {
      this.fetch()
    }
  }
</script>

<style scoped>

</style>