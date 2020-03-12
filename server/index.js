const express = require('express')

const app=express()

//允许跨域访问
app.use(require('cors')())

//识别客户端提交的json
app.use(express.json())

//数据库东西
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/element-admin',{
  useFindAndModify:true,
  useCreateIndex:true,
  useNewUrlParser:true
})

//数据操作模型
const Article = mongoose.model('Article',new mongoose.Schema({
  title:{type:String},
  body:{type:String},
  // cont:{type:String}
}))

//数据操作模型
const Article_com = mongoose.model('Article_com',new mongoose.Schema({
   cont:{type:String}
}))

//默认首页
app.get('/',async (req,res) => {
  res.send('index')
})



//新增文章--提交
app.post('/api/articles',async (req,res)=> {
  const article = await Article.create(req.body)
  res.send(article)
})

//新增pinglun--提交
app.post('/api/articles_com',async (req,res)=> {
  const article_com = await Article_com.create(req.body)
  res.send(article_com)
})


//显示列表
app.get('/api/articles',async (req,res)=>{
  const articles = await Article.find()
  res.send(articles)
})

//显示pinglun列表
app.get('/api/articles_com',async (req,res)=>{
  const articles_com = await Article_com.find()
  res.send(articles_com)
})

//删除文章
app.delete('/api/articles/:id',async (req,res)=>{
  await Article.findByIdAndDelete(req.params.id)
  res.send({
    status:true
  })
})

//删除评论
app.delete('/api/articles_com/:id',async (req,res)=>{
  await Article_com.findByIdAndDelete(req.params.id)
  res.send({
    status:true
  })
})

//文章详情
app.get('/api/articles/:id',async (req,res)=>{
  const article = await Article.findById(req.params.id)
  res.send(article)
})

//评论详情
app.get('/api/articles_com/:id',async (req,res)=>{
  const article_com = await Article_com.findById(req.params.id)
  res.send(article_com)
})

//修改文章
app.put('/api/articles/:id',async (req,res)=>{
  const article = await Article.findByIdAndUpdate(req.params.id,req.body)
  res.send(article)
})

//修改评论
app.put('/api/articles_com/:id',async (req,res)=>{
  const article_com = await Article_com.findByIdAndUpdate(req.params.id,req.body)
  res.send(article_com)
})

app.listen(3001,() => {
  console.log('http://localhost:3001/');
})