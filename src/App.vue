<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1']">
          <el-submenu  index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>内容管理
            </template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/index">文章管理</el-menu-item>
          </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>

    <!--&lt;!&ndash;      //评论区&ndash;&gt;-->
    <el-aside width="250px" style="background-color: rgb(238, 241, 246)" >

<!--      发表评论-->
      <div  class="recoment" :model="article_com">
        <el-input  v-model="article_com.cont" placeholder="请输入内容" class="recoment-item-cont" clearable></el-input>
        <el-button class="recoment-item-btn" @click="saveArticle">发送评论</el-button>
      </div>

<!--接收评论-->
      <div>
        <el-table :data="articles_com" >
          <el-table-column prop="cont" label="评论区" width="160px">
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button @click="remove(scope.row._id)" type="danger" size="small" disabled>删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </el-aside>
  </el-container>
</template>
<style>
    html,body{
      padding: 0;
      margin: 0;
    }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

    .el-aside {
    color: #333;
  }
  /*评论区*/
  .recoment{
    display: flex;
    padding: 10px;
  }
  .recoment-item-cont{
    flex: 6;
    padding-right: 5px;
  }

</style>

<script>
  export default {
  data() {
    return {
      article_com: {},
      articles_com:[],
    }
  },
    methods:{
      fetch(){
        this.$http.get('articles_com').then(res=>{
          this.articles_com = res.data
        })
      },
      saveArticle() {
        this.$http.post('/articles_com',this.article_com).then(res => {
          this.$message({
            message: '评论成功',
            type: 'success'
          });
          console.log(res);
          this.fetch()
          this.article_com.cont=''
        })
      },
      remove(id){
        this.$http.delete(`articles_com/${id}`).then(res=>{
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