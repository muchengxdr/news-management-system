import db from '../../db/index.js'

// 添加产品
export const productAdd = async (req, res) => {
  // console.log(req.body, req.file)
  const productmsg = req.body
  const productimg = `/productupload/${req.file.filename}`
  const edittime = new Date()
  const sqlStr = 'insert into products set ? '
  const product = {
    productname: productmsg.productname,
    introduction: productmsg.introduction,
    productimg: productimg,
    edittime: edittime
  }
  // console.log(news)
  const [rows] = await db.query(sqlStr, product)
  if (rows.affectedRows === 1) {
    res.send({
      status: 0,
      message: '添加成功'
    })
  }
}

// 获取产品
export const productList = async (req, res) => {
  const sql = 'select * from products'
  const [rows] = await db.query(sql)
  res.send({
    status: 0,
    message: '获取成功',
    data: rows
  })
}

// 删除产品
export const productDelete = async (req, res) => {
  // console.log(req.params)
  const sql = 'delete from products where id=?'
  const [rows] = await db.query(sql, req.params.id)
  if (rows.affectedRows === 1) {
    res.send({
      status: 0,
      message: '删除成功'
    })
  } else {
    res.send({
      status: 1,
      message: '删除失败'
    })
  }
}
