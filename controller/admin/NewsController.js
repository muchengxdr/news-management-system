import db from '../../db/index.js'

// 发布新闻
export const newsAdd = async (req, res) => {
  // console.log(req.body, req.file)
  const newsmsg = req.body
  const cover = `/newsupload/${req.file.filename}`
  const edittime = new Date()
  const sqlStr = 'insert into news set ? '
  const news = {
    title: newsmsg.title,
    content: newsmsg.content,
    category: Number(newsmsg.category),
    cover: cover,
    isPublish: Number(newsmsg.isPublish),
    edittime: edittime
  }
  // console.log(news)
  const [rows] = await db.query(sqlStr, news)
  if (rows.affectedRows === 1) {
    res.send({
      status: 0,
      message: '发布成功'
    })
  }
}

// 获取新闻列表
export const newsList = async (req, res) => {
  const sql = 'select * from news'
  const [rows] = await db.query(sql)
  res.send({
    status: 0,
    message: '获取成功',
    data: rows
  })
}

// 发布状态
export const newsPublish = async (req, res) => {
  // console.log(req.body)
  const publics = {
    ispublish: req.body.ispublish,
    edittime: new Date()
  }
  const sql = 'update news set ? where id=?'
  const [rows] = await db.query(sql, [publics, req.body.id])
  // console.log(rows)
  if (rows.affectedRows === 1) {
    if (req.body.ispublish === 1) {
      res.send({
        status: 0,
        message: '已发布'
      })
    } else {
      res.send({
        status: 1,
        message: '已取消发布'
      })
    }
  }
}

// 删除新闻
export const newsDelete = async (req, res) => {
  // console.log(req.params)
  const sql = 'delete from news where id=?'
  const [rows] = await db.query(sql, req.params.id)
  if (rows.affectedRows === 1) {
    res.send({
      status: 0,
      message: '删除成功'
    })
  }
}
