import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export function hash(str) {
  return crypto.createHmac('sha256', process.env.SECRET).update(str).digest('hex');
}

export function create_jwt(user_id) {
  let token = jwt.sign({ 'user_id': user_id }, process.env.SECRET);
  return token;
}

export function check_jwt(token, user_id) {
  let decoded_token = jwt.decode(token, process.env.SECRET);
  if (decoded_token != null && decoded_token['user_id'] == user_id) {
    return true
  } else {
    return false;
  }
}

export function check_secret(secret) {
  return (hash(secret) == hash(process.env.SECRET));
}
