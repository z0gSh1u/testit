// Mini-jest test script.
// auto-gen

const mj = require('F:\\testit\\mini-jest\\mini-jest.js')
const _bt = require('F:\\testit\\weiweibo\\main.js')

let _projectName = 'weiweibo'
let _result = []
let _total = 0, _pass = 0

mj.test("wrong email",
  [
    mj.toBe(
      _bt.newUser('ceshi', 'password', '13912345678', 'wrong.email@sina', '20')
      , 5
    )
  ],
  _result, () => { _pass += 1 }
)
_total += 1

mj.test("wrong phone",
  [
    mj.toBe(
      _bt.newUser('ceshi', 'abcdef', '114514', 'zx.cs@qq.com', '33')
      , 2
    )
  ],
  _result, () => { _pass += 1 }
)
_total += 1

let _toDump = {
  "mjInfo": "mini-jest 0.1",
  "projectName": _projectName,
  "passRate": _pass / _total,
  "result": _result
}

mj.dump(_toDump, `F:/testit/mini-jest/testscript`, 'weiweibo')

console.log("[mini-jest] Test finished.")