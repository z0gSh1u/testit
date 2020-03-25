// Mini-jest test script.
// auto-gen

const mj = require('../mini-jest')
const _bt = require('../../weiweibo/main')

let _projectName = 'example'
let _result = [], _total = 0, _pass = 0
let _dumpPlace = `F:/testit/mini-jest/`

mj.test("wrong email",
  [
    mj.toBe(
      _bt.newUser('ceshi', 'password', '13912345678', 'wrong.email@sina', '20')
      , 5
    )
  ],
  _result
)
total += 1

let _toDump = {
  "mjInfo": "mini-jest 0.1",
  "projectName": _projectName,
  "passRate": _pass / _total,
  "result": _result
}

mj.dump(_toDump, _dumpPlace, _projectName)
