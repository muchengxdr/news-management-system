import express from 'express'
import {
  productAdd,
  productList,
  productDelete
} from '../../controller/admin/ProductController.js'
import multer from 'multer'

const router = express.Router()

// 发布产品
const upload = multer({ dest: 'public/productupload/' })
router.post('/product/add', upload.single('file'), productAdd)

// 获取产品
router.get('/product/list', productList)
// 删除产品
router.delete('/product/list/:id', productDelete)

export default router
