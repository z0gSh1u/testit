
// Mini-jest test script.
// auto-gen
const mj = require("F:\\testit\\mini-jest\\mini-jest.js")
const _bt = require("F:\\testit\\weiweibo\\main.js")

let _projectName = 'weiweibo'
let _result = [], _total = 0, _pass = 0
let _dumpPlace = `F:\\testit\\mini-jest\\testscript\\auto`

mj.test("C1.1-用户注册",
  [
    mj.toBe(
      _bt.newUser('zhuoxu1', 'zhuoxu', '19987654321', 'abc.123@qq.com.cn', '20'), 0
    ),

    mj.toBe(
      _bt.newTweet('zhuoxu1', 'Hello'), 0
    ),

    mj.toHaveLength(
      _bt.fetchTweetByUsername('zhuoxu1'), 1
    ),
  ], _result, () => { _pass += 1 }
)
_total += 1

let _toDump = {
  "mjInfo": "mini-jest 0.1",
  "projectName": _projectName,
  "passRate": _pass / _total,
  "result": _result
}
mj.dump(_toDump, _dumpPlace, _projectName)
