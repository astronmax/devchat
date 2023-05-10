import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export function hash(str) {
  return crypto.createHmac('sha256', process.env.SECRET).update(str).digest('hex');
}

export function create_jwt(user_id) {
  let token = jwt.sign({ 'user_id': user_id }, process.env.SECRET);
  return token;
}

export function check_jwt(token) {
  let decoded_token = jwt.decode(token, process.env.SECRET);
  return (decoded_token != null);
}
