import express from 'express'
import { newsList } from '../../controller/web/NewsController.js'

const router = express.Router()

// 获取新闻列表
router.get('/news/list', newsList)

export default router
