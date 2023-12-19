import db from '../../db/index.js'
// 导入token
import jwt from 'jsonwebtoken'
import config from '../../config.js'

import fs from 'fs'
import path from 'path'

// 接口处理函数
// 登录接口
export const Login = async (req, res) => {
  const userinfo = req.body
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不合法' })
  }
  const sql = 'select * from users where username=? and password=?'
  const [rows] = await db.query(sql, [userinfo.username, userinfo.password])
  if (rows.length !== 1) {
    return res.send({ status: 1, message: '账号或密码错误' })
  }
  // 生成 token
  const user = { username: userinfo.username, password: '' }
  const token = jwt.sign(user, config.jwtSecretKey, {
    expiresIn: config.expires
  })
  res.send({
    status: 0,
    message: '登录成功',
    token: 'Bearer ' + token,
    data: {
      id: rows[0].id,
      username: rows[0].username,
      password: rows[0].password,
      gender: Number(rows[0].gender),
      introduction: rows[0].introduction,
      avatar: rows[0].avatar,
      role: Number(rows[0].role)
    }
  })
}

// 个人中心更新
export const upload = async (req, res) => {
  // console.log(req.body, req.file)
  const userabc = req.body
  const avatar = req.file ? `/avatarupload/${req.file.filename}` : ''
  const user = {
    username: userabc.username,
    password: userabc.password,
    gender: Number(userabc.gender),
    role: Number(userabc.role),
    introduction: userabc.introduction
  }
  const sql = 'update users set ? where id=?'
  if (avatar) {
    user.avatar = avatar
    db.query(sql, [user, userabc.id])
    const [rows] = await db.query('select * from users where id=?', userabc.id)
    res.send({
      message: '成功',
      data: rows
    })
  } else {
    db.query(sql, [user, userabc.id])
    const [rows] = await db.query('select * from users where id=?', userabc.id)
    res.send({
      message: '成功',
      data: rows
    })
  }
}

// 添加用户接口
export const regUser = async (req, res) => {
  const userabc = req.body
  // console.log(userabc, req.file)
  const avatar = `/avatarupload/${req.file.filename}`
  const sql = 'select * from users where username=?'
  const [rows] = await db.query(sql, userabc.username)
  if (rows.length === 0) {
    const sqlStr = 'insert into users set ? '
    const user = {
      username: userabc.username,
      password: userabc.password,
      role: Number(userabc.role),
      gender: Number(userabc.gender),
      introduction: userabc.introduction,
      avatar: avatar
    }
    db.query(sqlStr, user)
    return res.send({
      status: 0,
      message: '添加成功'
    })
  } else {
    // 删除文件
    const __dirname = path.resolve()
    const filepath = path.join(
      __dirname,
      '/public/avatarupload/' + req.file.filename
    )
    fs.unlink(filepath, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
  res.send({
    status: 1,
    message: '用户名已存在，请更换用户名'
  })
}

// 用户列表接口
export const userList = async (req, res) => {
  const sql = 'select * from users'
  const [rows] = await db.query(sql)
  res.send({
    status: 0,
    message: '获取成功',
    data: rows
  })
}
// 删除用户
export const userDelete = (req, res) => {
  // console.log(req.params.id)
  const sql = 'delete from users where id=?'
  db.query(sql, req.params.id)

  res.send({
    status: 0,
    message: '删除成功'
  })
}

// 用户更新
export const userPut = (req, res) => {
  // console.log(req.body)
  const user = req.body

  const sql = 'update users set ? where id=?'
  db.query(sql, [user, user.id])
  res.send({
    status: 0,
    message: '修改成功'
  })
}
