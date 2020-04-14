// ========================
// | 测试脚本自动生成DOM操作 |
// ========================

let functions = null
let totalCases = 0
let caseId = 0
let caseStep = [-1] // caseStep[id] = nCaseStep
let description = {}

document.getElementById('prefixCode').innerHTML =
  `const mj = require(<path_to_mini_jest>)
const _bt = require(<path_to_the_being_tested>)`

/**
 * 打开用例工具箱
 */
function openToolbox() {
  let w = window.open('3-toolbox.html', '_blank', 'width=300, height=370')
  w.focus()
}

/**
 * 代码读取
 */
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

/**
 * 代码分析
 */
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
    func = func.replace('function', '').replace(' ', '').replace('{', '')
    let lParenPos = func.indexOf('('), rParenPos = func.indexOf(')')
    let funcName = func.substring(0, lParenPos), paramNames = []
    if (rParenPos > lParenPos + 1) {
      let params = func.substring(lParenPos + 1, rParenPos)
      paramNames = params.split(',').map(v => v.trim())
    }
    functions.push({ funcName, paramNames })
  })
  alert('代码分析完成。')
}

/**
 * 新增用例步骤
 */
function addStep(id) {
  caseStep[id] += 1
  let dom = document.getElementById(`casetable_${id}`)
  let tr = dom.insertRow(dom.rows.length), td
  td = tr.insertCell(0)
  td.innerHTML = `
<select id="type_${id}_${caseStep[id]}">
<option value="toBe">toBe</option>
<option value="toBeArray">toBeArray</option>
<option value="toHaveLength">toHaveLength</option>
<option value="toContain">toContain</option>
<option value="toNotContain">toNotContain</option>
</select>
  `
  td = tr.insertCell(1)
  td.innerHTML = `
<select id="testfunc_${id}_${caseStep[id]}"></select>
`
  td = tr.insertCell(2)
  td.innerHTML = `
<textarea rows="5" style="width: 80%; margin: 5px;" id="param_${id}_${caseStep[id]}"></textarea>
`
  td = tr.insertCell(3)
  td.innerHTML = `
<textarea rows="5" style="width: 80%; margin: 5px;" id="expect_${id}_${caseStep[id]}"></textarea>
`
  let testfuncDom = document.getElementById(`testfunc_${id}_${caseStep[id]}`)
  functions.forEach((v, i) => {
    testfuncDom.options[i] = new Option(v.funcName, v.funcName)
  })
  testfuncDom.onchange = (function (_id, _caseStepOfId) {
    let that = document.getElementById(`testfunc_${_id}_${_caseStepOfId}`)
    return function (ev) {
      let selectedFuncParams = functions[that.selectedIndex].paramNames
      let paramInputDom = document.getElementById(`param_${_id}_${_caseStepOfId}`)
      paramInputDom.value = JSON.stringify(selectedFuncParams, null, 2)
    }
  })(id, caseStep[id])
  testfuncDom.onchange.call(document)
}

/**
 * 新增用例
 */
function addCase() {
  if (!functions) { alert('请先分析代码！'); return }
  caseId += 1
  caseStep[caseId] = 0
  let caseTemplate = `
<span>用例名：</span>
<input type="text" id="casename_${caseId}" style="width:300px;margin-bottom:5px;"><br>
<table border="1" style="width: 100%;" id="casetable_${caseId}">
  <thead>
    <th style="width: 15%;">类型</th>
    <th style="width: 20%;">被测函数</th>
    <th style="width: 40%;">参数</th>
    <th style="width: 25%;">期待结果</th>
  </thead>
  <tbody>
  </tbody>
</table>
<button onclick="addStep(${caseId});" style="margin-top:5px;">新增步骤</button>
`
  let casesDom = document.getElementById('cases')
  let newDivNode = document.createElement('div')
  newDivNode.className = "case"
  newDivNode.id = `case_${caseId}`
  newDivNode.innerHTML = caseTemplate
  casesDom.appendChild(newDivNode)
}

/**
 * 生成脚本
 */
function generate(nosave) {
  let template_prefix = `
// Mini-jest test script.
// auto-gen
`
  template_prefix += document.getElementById('prefixCode').value + `
`
  let projectName = document.getElementById('projectName').value
  let dumpPlace = document.getElementById('dumpPlace').value
  let template_head = `
let _projectName = '${projectName}'
let _result = [], _total = 0, _pass = 0
let _dumpPlace = \`${dumpPlace}\`
`
  let template_body = ''
  for (let i = 1; i <= caseId; i++) {
    let caseName = document.getElementById(`casename_${i}`).value
    let template = `
mj.test("${caseName}",
[`
    for (let j = 1; j <= caseStep[i]; j++) {
      let caseType = document.getElementById(`type_${i}_${j}`).value
      let caseFunc = document.getElementById(`testfunc_${i}_${j}`).value
      let caseParam = eval(document.getElementById(`param_${i}_${j}`).value)
      let caseExpect = document.getElementById(`expect_${i}_${j}`).value
      let formatParam = ''
      caseParam.forEach(v => {
        formatParam += (typeof v == 'string' ? `'${v}'` : v) + ','
      })
      formatParam = formatParam.substring(0, formatParam.length - 1)
      template += `
mj.${caseType} (
  _bt.${caseFunc}(${formatParam}), ${caseExpect}
),
`
      if (j == 1) {
        console.log("init ", caseName)
        description[caseName] = []
      }
      description[caseName].push({
        type: caseType,
        func: `${caseFunc}(${formatParam})`,
        expect: `${caseExpect}`
      })
    }
    template = template.substring(0, template.length - 1)
    template += `
], _result, () => { _pass += 1 }
)
_total += 1
`
    template_body += template
  }
  let template_tail = `
    let _toDump = {
      "mjInfo": "mini-jest 0.1",
      "projectName": _projectName,
      "passRate": _pass / _total,
      "result": _result
    }
    mj.dump(_toDump, _dumpPlace, _projectName)
`
  let summary = template_prefix + template_head + template_body + template_tail
  if (!nosave) {
    saveShareContent(summary, `${projectName}.test.js`)
    alert('测试脚本保存成功，请到本地执行。')
  }
}

function saveShareContent(content, fileName) {
  let downLink = document.createElement('a')
  downLink.download = fileName
  let blob = new Blob([content])
  downLink.href = URL.createObjectURL(blob)
  document.body.appendChild(downLink)
  downLink.click()
  document.body.removeChild(downLink)
}

/**
 * 生成描述文件
 */
function generateDesc() {
  generate(true)
  let projectName = document.getElementById('projectName').value
  let jsonString = JSON.stringify({ cases: description }, null, 2)
  saveShareContent(jsonString, `${projectName}_MJDesc.json`)
  alert('描述文件已生成，请保存到本地！')
}