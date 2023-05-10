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

export async function get_user_by_id(user_id) {
  const con = await mysql.createConnection(db_data);
  const [rows, _] = await con.execute('SELECT * FROM `User` WHERE `UserID` = ?', [user_id]);
  return rows[0];
}

export async function get_groups(user_id) {
  const con = await mysql.createConnection(db_data);
  const [groups, _] = await con.execute(
    'SELECT `group` FROM `User_Group` WHERE `user` = ? ',
    [user_id]
  );

  let result = [];
  for (let i = 0; i < groups.length; i++) {
    let group_id = groups[i]['group'];
    const [rows, _] = await con.execute(
      'SELECT `name` FROM `Group` WHERE `GroupID` = ?',
      [group_id]
    );

    let group_name = rows[0]['name'];
    result.push({ title: group_name, id: group_id });
  }

  return result;
}

export async function get_directs(user_id) {
  const con = await mysql.createConnection(db_data);
  const [me_src, fields] = await con.execute(
    'SELECT DISTINCT `source` FROM `DirectMessage` WHERE `destination` = ?',
    [user_id]
  );
  const [me_dst, _] = await con.execute(
    'SELECT DISTINCT `destination` FROM `DirectMessage` WHERE `source` = ?',
    [user_id]
  );

  let total_directs = [];
  for (let i = 0; i < me_src.length; i++) {
    total_directs.push(me_src[i]['source']);
  }
  for (let i = 0; i < me_dst.length; i++) {
    total_directs.push(me_dst[i]['destination']);
  }

  let directs = [...new Set(total_directs)];
  let result = [];
  for (let i = 0; i < directs.length; i++) {
    const [rows, _] = await con.execute(
      'SELECT `name` FROM `User` WHERE `UserID` = ?',
      [directs[i]]
    );
    let name = rows[0]['name'];
    result.push({ title: name, id: directs[i] });
  }

  return result;
}

export async function get_direct_msgs(user_id, direct_id) {
  const con = await mysql.createConnection(db_data);
  const sql = "SELECT DISTINCT * FROM `DirectMessage` WHERE (`source` = ? AND `destination` = ?) OR (`source` = ? AND `destination` = ?) ORDER BY `DirectMessageID`;"
  const [rows, _] = await con.execute(sql, [user_id, direct_id, direct_id, user_id]);
  let result = [];
  for (let i = 0; i < rows.length; i++) {
    const [tmp, _] = await con.execute(
      'SELECT `name` FROM `User` WHERE `UserID` = ?',
      [rows[i]['source']]
    );
    let name = tmp[0]['name'];
    result.push({ username: name, body: rows[i]['body'], id: rows[i]['DirectMessageID'] });
  }

  return result;
}
