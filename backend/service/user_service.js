import mysql from 'mysql2/promise';

const db_data = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

export async function add_user(login, password) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute('SELECT * FROM `User` WHERE `name` = ?', [login]);
  if (rows.length > 0) {
    return false;
  }

  let sql = 'INSERT INTO `User` (`name`, `password`) VALUES (?, ?)';
  await con.execute(sql, [login, password]);
  return true;
}

export async function try_login(login, password) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute('SELECT * FROM `User` WHERE `name` = ?', [login]);
  if (rows.length == 1) {
    let real_password = rows[0]['password'];
    if (real_password === password) {
      return rows[0]['UserID'];
    }
  }

  return 0;
}
