let functions = null

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
      paramNames = params.split(',')
    }
    functions.push({ funcName, paramNames })
  })
  alert("分析完成")
}