// Pseudo backend of weiweibo.
// by z0gSh1u @ 2020-02-29

const fs = require('fs')
const path = require('path')

const USERTABLE_PATH = path.join(__dirname, 'data/user.json')
const TWEETTABLE_PATH = path.join(__dirname, 'data/tweet.json')

/**
 * 新用户注册。
 * @param username 用户名，不以数字开头，不包含特殊符号，至多10位
 * @param password 密码，不以数字开头，至少6位，至多20位，不能是纯数字
 * @param mobile 手机号
 * @param email 电子邮箱地址
 * @param age 年龄
 * @returns 状态码。0：注册成功；1：用户重复；2：用户名不合规；3：密码不合规；4：手机号不合规；
 * 5：电子邮箱不合规；6：年龄不合规
 */
function newUser(username, password, mobile, email, age) {
  // check username format
  if (!username || username.length < 1 || username.length > 10) return 2
  // check password format
  if (!password || password.length < 6 || password.length > 20) return 3
  if (password.match(/^[0-9]*$/)) return 3
  // check mobile format
  if (!mobile || !mobile.match(/^1[3|4|5|7|8][0-9]{9}$/)) return 4
  // check email format
  let emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  if (!email || !email.match(emailPattern)) return 5
  // check age format
  if (!age || age < 0 || age > 200) return 6
  // check duplicate username
  let userTable = JSON.parse(fs.readFileSync(USERTABLE_PATH))
  if (userTable[username]) return 1
  // register
  userTable[username] = { password, mobile, email, age }
  fs.writeFileSync(USERTABLE_PATH, JSON.stringify(userTable))
  let tweetTable = JSON.parse(fs.readFileSync(TWEETTABLE_PATH))
  tweetTable[username] = []
  fs.writeFileSync(TWEETTABLE_PATH, JSON.stringify(tweetTable))
  return 0
}
module.exports.newUser = newUser

/**
 * 发送新微博。
 * @param username 用户名
 * @param content 微博内容，不超过140字
 * @returns 状态码。0：发送成功；1：微博长度不正确 ；2：用户不存在
 */
function newTweet(username, content) {
  // check content format
  if (!content || content.length < 1 || content.length > 140) return 1
  // check user
  let userTable = JSON.parse(fs.readFileSync(USERTABLE_PATH))
  if (!userTable[username]) return 2
  // send
  let tweetTable = JSON.parse(fs.readFileSync(TWEETTABLE_PATH))
  tweetTable[username].push(content)
  fs.writeFileSync(TWEETTABLE_PATH, JSON.stringify(tweetTable))
  return 0
}
module.exports.newTweet = newTweet

/**
 * 获取某用户的全部微博。
 * @param username 用户名
 * @returns 微博列表数组。若用户不存在返回空数组。用户无微博也返回空数组
 */
function fetchTweetByUsername(username) {
  let tweetTable = JSON.parse(fs.readFileSync(TWEETTABLE_PATH))
  if (!tweetTable[username]) return []
  return tweetTable[username]
}
module.exports.fetchTweetByUsername = fetchTweetByUsername

/**
 * 获取所有用户的微博。
 * @returns 用户名-微博数组对应
 */
function fetchTweetAll() {
  let tweetTable = JSON.parse(fs.readFileSync(TWEETTABLE_PATH))
  return tweetTable
}
module.exports.fetchTweetAll = fetchTweetAll