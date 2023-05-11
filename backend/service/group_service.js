import mysql from 'mysql2/promise';
import { add_in_group } from './user_service.js';

const db_data = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
}

export async function add_group(group_name, user_id) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute('SELECT * FROM `Group` WHERE `name` = ?', [group_name]);
  if (rows.length > 0) {
    return false;
  }
  await con.execute('INSERT INTO `Group` (`name`) VALUES (?)', [group_name]);
  let [tmp, fields] = await con.execute('SELECT * FROM `Group` WHERE `name` = ?', [group_name]);
  let group_id = tmp[0]['GroupID'];
  add_in_group(user_id, group_id);
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

export async function delete_user_from_group(user_id, group_id) {
  const con = await mysql.createConnection(db_data);
  await con.execute(
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

export async function get_group_msgs(group_id) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute(
    'SELECT * FROM `GroupMessage` WHERE `group` = ? ORDER BY `GroupMessageID`',
    [group_id]
  );
  let result = [];
  for (let i = 0; i < rows.length; i++) {
    const [tmp, _] = await con.execute(
      'SELECT `name` FROM `User` WHERE `UserID` = ?',
      [rows[i]['author']]
    );

    let name = tmp[0]['name'];
    result.push({ username: name, body: rows[i]['body'], id: rows[i]['GroupMessageID'] });
  }

  return result;
}
