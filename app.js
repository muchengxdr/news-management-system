import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import userRouter from './routes/admin/user.js'
import expressJWT from 'express-jwt'
import config from './config.js'
import newsRouter from './routes/admin/NewsRouter.js'
import productRouter from './routes/admin/ProductRouter.js'
import webNewsRouter from './routes/web/NewsRouter.js'

const app = express()

// 配置跨域 cors

app.use(cors())
app.use(express.static('public'))
// app.use(express.static('./public/productupload'))

// 解析表单数据的中间件
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
// app.use(bodyParser.)

app.use('/webapi', webNewsRouter)

// 解析token的中间件
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: /^\/adminuser/ })
)
// 路由模块
app.use('/adminuser', userRouter)
app.use('/adminapi', userRouter)
app.use('/adminapi', newsRouter)
app.use('/adminapi', productRouter)

// 错误级别的中间件
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: err.status,
      message: '身份认证失败'
    })
  }
})

app.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})
