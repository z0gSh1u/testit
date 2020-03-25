
let functions = null
let totalCases = 0
let caseId = 0

document.getElementById('prefixCode').innerHTML =
  `const mj = require(<path_to_mini_jest>)
const _bt = require(<path_to_the_being_tested>)`

function openToolbox() {
  let w = window.open('3-toolbox.html', '_blank', 'width=300, height=370')
  w.focus()
}

async function getCode() {
  return new Promise((resolve, reject) => {
    let objFile = document.getElementById('codeInput').files[0]
    let reader = new FileReader()
    reader.readAsText(objFile, "UTF-8")
    reader.onload = (event) => {
      resolve(event.target.result)
    }
  })
}

async function analyzeCode() {
  let code = await getCode(), codeLines = code.split('\n'), pattern = /function.*/
  let funcDeclLines = []
  codeLines.forEach(line => {
    if (line.match(pattern)) {
      funcDeclLines.push(line)
    }
  })
  functions = []
  funcDeclLines.forEach(func => {
    func = func.replace("function", '').replace(' ', '').replace('{', '')
    let lParenPos = func.indexOf('('), rParenPos = func.indexOf(')')
    let funcName = func.substring(0, lParenPos), paramNames = []
    if (rParenPos > lParenPos + 1) {
      let params = func.substring(lParenPos + 1, rParenPos)
      paramNames = params.split(',').map(v => v.trim())
    }
    functions.push({ funcName, paramNames })
  })
  alert("分析完成。")
}

function addCase() {
  if (!functions) { alert('请先分析代码！'); return }
  caseId += 1
  let caseTemplate = `
<span>用例名：</span>
<input type="text" id="casename_${caseId}" style="width:300px">
<p>用例详情：</p>
<table border="1" style="width: 100%;">
  <thead>
    <th style="width: 15%;">类型</th>
    <th style="width: 20%;">被测函数</th>
    <th style="width: 40%;">参数</th>
    <th style="width: 25%;">期待结果</th>
  </thead>
  <tbody>
    <tr>
      <td>
        <select id="type_${caseId}">
          <option value="toBe">toBe</option>
          <option value="toBeArray">toBeArray</option>
          <option value="toHaveLength">toHaveLength</option>
          <option value="toContain">toContain</option>
          <option value="toNotContain">toNotContain</option>
        </select>
      </td>
      <td>
        <select id="testfunc_${caseId}">
        </select>
      </td>
      <td>
        <textarea rows="7" style="width: 80%; margin: 5px;" id="param_${caseId}"></textarea>
      </td>
      <td>
        <textarea rows="7" style="width: 80%; margin: 5px;" id="expect_${caseId}"></textarea>
      </td>
    </tr>
  </tbody>
</table>
`
  let casesDom = document.getElementById('cases')
  let newDivNode = document.createElement('div')
  newDivNode.className = "case"
  newDivNode.id = `case_${caseId}`
  newDivNode.innerHTML = caseTemplate
  casesDom.appendChild(newDivNode)
  let testfuncDom = document.getElementById(`testfunc_${caseId}`)
  functions.forEach((v, i) => {
    testfuncDom.options[i] = new Option(v.funcName, v.funcName)
  })
  testfuncDom.onchange = function (ev) {
    let selectedFuncParams = functions[testfuncDom.selectedIndex].paramNames
    let thisCaseId = testfuncDom.id.substring(testfuncDom.id.indexOf('_') + 1)
    let paramInputDom = document.getElementById(`param_${thisCaseId}`)
    paramInputDom.value = JSON.stringify(selectedFuncParams, null, 2)
  }
  testfuncDom.onchange.call(document)
}

function generate() {
  let content = `
// Mini-jest test script.
// auto-gen`
  content += document.getElementById('prefixCode').value + `
`
  let projectName = document.getElementById('projectName').value
  let dumpPlace = document.getElementById('dumpPlace').value
  let template_head = `
let _projectName = ${projectName}
let _result = [], _total = 0, _pass = 0
let _dumpPlace = ${dumpPlace}
`
  let template_item = `
mj.test(${caseName},
  [
    mj.toBe(
      _bt.newUser('ceshi', 'password', '13912345678', 'wrong.email@sina', '20')
      , 5
    )
  ],
  _result
)
total += 1
`
  let template_tail = `
let _toDump = {
  "mjInfo": "mini-jest 0.1",
  "projectName": _projectName,
  "passRate": _pass / _total,
  "result": _result
}
mj.dump(_toDump, _dumpPlace, _projectName)
`
}