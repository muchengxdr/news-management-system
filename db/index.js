import mysql from 'mysql2'

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  database: 'my_sql',
  user: 'root',
  password: 'admin'
})

export default pool.promise()
