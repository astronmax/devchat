import mysql from 'mysql2/promise';

const db_data = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

export async function add_group(group_name) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute('SELECT * FROM `Group` WHERE `name` = ?', [group_name]);
  if (rows.length > 0) {
    return false;
  }
  await con.execute('INSERT INTO `Group` (`name`) VALUES (?)', [group_name]);
  return true;
}

export async function add_user_to_group(group_id, user_id) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute(
    'INSERT INTO `User_Group` (`user`, `group`) VALUES (?, ?)',
    [user_id, group_id]
  );
  return true;
}

export async function delete_user_from_group(group_id, user_id) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute(
    'DELETE FROM `User_Group` WHERE `group` = ? AND `user` = ?',
    [group_id, user_id]
  );
  return true
}

export async function get_users_count(group_id) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute(
    'SELECT count(*) AS users_count FROM `User_Group` WHERE `group` = ?',
    [group_id]
  );
  return rows[0]['users_count'];
}
