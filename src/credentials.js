import md5 from 'md5'

const PUBLIC_KEY = 'bbe7e42c6862c343448ba82970d75b9a'
const SECRET_KEY = '40926bf1c0203caa5ccab49deedc363cbc453abf'
const timestamp = Number(new Date())
const hash = md5(timestamp + SECRET_KEY + PUBLIC_KEY)

export {
  PUBLIC_KEY,
  SECRET_KEY,
  timestamp,
  hash
}