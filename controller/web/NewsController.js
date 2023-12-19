import db from '../../db/index.js'

export const newsList = async (req, res) => {
  const sql = 'select * from news where ispublish=? order by id desc'
  const [rows] = await db.query(sql, 1)
  res.send({
    status: 0,
    message: '获取成功',
    data: rows
  })
}
