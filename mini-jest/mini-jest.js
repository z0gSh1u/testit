// Mini-jest testing framework.
// by z0gSh1u @ 2020-03-05

const fs = require('fs')
const path = require('path')

function dump(result, to, projectname) {
  fs.writeFileSync(path.join(to, `${projectname}_MJResult.json`), JSON.stringify(result, null, 2))
}
module.exports.dump = dump

function test(description, body, result, passCb) {
  let partResult = { description }
  partResult['body'] = []
  let hasFail = false
  body.forEach((step, i) => {
    partResult['body'][i] = step ? 'PASS' : 'FAIL'
    if (!step) hasFail = true
  })
  result.push(partResult)
  !hasFail && passCb && passCb()
}
module.exports.test = test

function toBe(src, expect) {
  return src === expect
}
module.exports.toBe = toBe

function toBeArray(src, expect) {
  if (src.length !== expect.length) { return false }
  let flag = false
  for (let i = 0; i < src.length; i++) {
    for (let j = 0; j < expect.length; j++) {
      if (src[i] === expect[j]) { flag = true; break }
    }
    if (!flag) { return false }
    flag = false
  }
  return true
}
module.exports.toBeArray = toBeArray

function toHaveLength(src, len) {
  return src.length && src.length == len
}
module.exports.toHaveLength = toHaveLength

function toContain(src, contain) {
  if (!src.length) { return false }
  for (let i = 0; i < src.length; i++) {
    if (src[i] === contain) {
      return true
    }
  }
  return false
}
module.exports.toContain = toContain

function toNotContain(src, what) {
  return !toContain(src, what)
}
module.exports.toNotContain = toNotContain