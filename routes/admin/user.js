import express from 'express'
import {
  Login,
  regUser,
  userList,
  userDelete,
  userPut,
  upload
} from '../../controller/admin/user.js'
import multer from 'multer'

const router = express.Router()

// 登录
router.post('/login', Login)

// 个人中心更新
const upLoaduser = multer({ dest: 'public/avatarupload/' })

router.post('/user/upload', upLoaduser.single('file'), upload)

// 添加用户
const addUser = multer({ dest: 'public/avatarupload/' })
router.post('/user/reguser', addUser.single('file'), regUser)

// 用户列表
router.get('/user/list', userList)
// 删除用户
router.delete('/user/list/:id', userDelete)
// 用户修改
router.put('/user/list', userPut)

export default router
