import express from 'express'
import {
  newsAdd,
  newsList,
  newsPublish,
  newsDelete
} from '../../controller/admin/NewsController.js'
import multer from 'multer'

const router = express.Router()

// 发布新闻
const upload = multer({ dest: 'public/newsupload/' })
router.post('/news/add', upload.single('file'), newsAdd)

// 获取新闻列表
router.get('/news/list', newsList)
// 发布状态
router.put('/news/publish', newsPublish)
// 删除新闻
router.delete('/news/list/:id', newsDelete)

export default router
