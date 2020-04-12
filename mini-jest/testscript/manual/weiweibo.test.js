// Mini-jest test script.
// manual

const mj = require('F:\\testit\\mini-jest\\mini-jest.js')
const _bt = require('F:\\testit\\weiweibo\\main.js')

let _projectName = 'weiweibo'
let _result = []
let _total = 0,
  _pass = 0
let _passCb = () => {
  _pass += 1
}

// =========== C1 ===========
mj.test(
  'C1.1-用户注册-用户重复',
  [
    mj.toBe(
      _bt.newUser('test', 'zhuoxu', '13912345678', 'a@b.com', '20'), 0
    ),
    mj.toBe(
      _bt.newUser('test', 'zhuoxu', '13912345678', 'a@b.com', '20'), 1
    )
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C1.2-用户注册-用户名不合规',
  [
    mj.toBe(
      _bt.newUser('123%abc', 'zhuoxu', '13912345678', 'a@b.com', '20'), 2
    ),
    mj.toBe(
      _bt.newUser('aaaaaaaaaab', 'zhuoxu', '13912345678', 'a@b.com', '20'), 2
    )
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C1.3-用户注册-密码不合规',
  [
    mj.toBe(
      _bt.newUser('test0', '123456', '13912345678', 'a@b.com', '20'), 3
    ),
    mj.toBe(
      _bt.newUser('test0', 'abc', '13912345678', 'a@b.com', '20'), 3
    ),
    mj.toBe(
      _bt.newUser('test0', '123456789012345678901', '13912345678', 'a@b.com', '20'), 3
    )
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C1.4-用户注册-手机号不合规',
  [
    mj.toBe(
      _bt.newUser('test0', 'zhuoxu', '66612345678', 'a@b.com', '20'), 4
    ),
    mj.toBe(
      _bt.newUser('test0', 'zhuoxu', '139123456789', 'a@b.com', '20'), 4
    ),
    mj.toBe(
      _bt.newUser('test0', 'zhuoxu', '1391234567', 'a@b.com', '20'), 4
    )
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C1.5-用户注册-电子邮箱不合规',
  [
    mj.toBe(
      _bt.newUser('test0', 'zhuoxu', '13912345678', 'test@baidu', '20'), 5
    )
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C1.6-用户注册-年龄不合规',
  [
    mj.toBe(
      _bt.newUser('test0', 'zhuoxu', '13912345678', 'a@b.com', '201'), 6
    ),
    mj.toBe(
      _bt.newUser('test0', 'zhuoxu', '13912345678', 'a@b.com', '-1'), 6
    )
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C1.7-用户注册-正常注册',
  [
    mj.toBe(
      _bt.newUser('test2', 'southeast', '13898765432', 'hello@xxx.edu.hk', '30'), 0
    )
  ],
  _result, _passCb
)
_total += 1

// =========== C2 ===========
mj.test(
  'C2.1-发送新微博-用户不存在',
  [
    mj.toBe(
      _bt.newTweet("xxx", "abcdefg"), 2
    )
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C2.2-发送新微博-微博长度不正确',
  [
    mj.toBe(
      _bt.newTweet("test2", ""), 1
    ),
    mj.toBe(
      _bt.newTweet("test2",
        "一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十补")
      , 1
    )
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C2.3-发送新微博-正常发送',
  [
    mj.toBe(
      _bt.newTweet("test2", "一二三四五六七八九十一二三四五六七八九十"), 0
    )
  ],
  _result, _passCb
)
_total += 1

// =========== C3 ===========
mj.test(
  'C3.1-获取微博-用户不存在',
  [
    mj.toBeArray(_bt.fetchTweetByUsername("xxx"), [])
  ],
  _result, _passCb
)
_total += 1
mj.test(
  'C3.1-获取微博-用户存在',
  [
    mj.toBeArray(_bt.fetchTweetByUsername("test3"), []),
    mj.toHaveLength(_bt.fetchTweetByUsername("test2"), 1)
  ],
  _result, _passCb
)
_total += 1

// =========== C4 ===========
// 人工介入测试

let _toDump = {
  mjInfo: 'mini-jest 0.1 manual',
  projectName: _projectName,
  passRate: _pass / _total,
  result: _result
}

mj.dump(_toDump, `F:/testit/mini-jest/testscript/manual`, 'weiweibo')
console.log('[mini-jest] Test finished.')
