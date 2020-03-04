# weiweibo

weiweibo（微微博）是为完成东南大学《软件测试》课程作业而编写的，作为待测试软件用途的小程序。你可以认为这是一款简单的微博系统的后端。它主要包括如下四个功能：

1. 新用户注册

   测试目标主要包括合法性校验、重复注册的避免。

   ```js
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
   function newUser(username, password, mobile, email, age)
   ```

2. 发送新微博

   测试目标主要包括合法性校验。

   ```js
   /**
    * 发送新微博。
    * @param username 用户名
    * @param content 微博内容，不超过140字
    * @returns 状态码。0：发送成功；1：微博长度不正确 ；2：用户不存在
    */
   function newTweet(username, content)
   ```

3. 获取某用户微博

   测试目标主要包括与`newTweet`功能的联合。

   ```js
   /**
    * 获取某用户的全部微博。
    * @param username 用户名
    * @returns 微博列表数组。若用户不存在返回空数组。用户无微博也返回空数组
    */
   function fetchTweetByUsername(username)
   ```

4. 获取所有用户微博

   测试目标主要包括与`fetchTweetByUsername`的联合，即$\bigcup_{alluser}tweet=fetchTweetAll$。

   ```js
   /**
    * 获取所有用户的微博。
    * @returns 用户名-微博数组对应
    */
   function fetchTweetAll()
   ```

作者：z0gSh1u @ https://github.com/z0gSh1u