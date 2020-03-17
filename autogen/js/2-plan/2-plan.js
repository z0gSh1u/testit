function createTestFocus(divId) {
    newDiv = createDiv()
    document.getElementById(divId).appendChild(newDiv)
    newDiv.innerHTML += "<input type='text' style='width:10%'><b>功能：</b><button onclick=\"deleteDiv('" + newDiv.id + "')\">删除</button><br />"
    newTestFocusDiv = createDiv()
    newTestFocusDiv.style = "display:inline"
    newDiv.appendChild(newTestFocusDiv)
    newDiv.innerHTML += "<button onclick=\"insertRow4List('" + newTestFocusDiv.id + "')\">十</button> <button onclick=\"deleteRow4List('" + newTestFocusDiv.id + "')\">一</button>"
    newDiv.innerHTML += "<br /><br />"
}

function createGenerationMethod(divId) {
    newDiv = createDiv()
    document.getElementById(divId).appendChild(newDiv)
    newDiv.innerHTML += "测试用例生成方法：" + "<button onclick=\"deleteDiv('" + newDiv.id + "')\">删除</button><br />"
    newDiv.innerHTML += "代码：<input type='text' style='width:95%'><br />功能：<input type='text' style='width:95%'><br />"
    table = createTable()
    newDiv.appendChild(table)
    table.insertRow(0).innerHTML = "<th style='width:11%'></th><th>等价类</th><th>例子</th>"
    newDiv.innerHTML += "<button onclick=\"insertRow4EquivalenceClassTable('" + table.id + "')\">十</button>"
    newDiv.innerHTML += "<button onclick=\"deleteRow4Table('" + table.id + "')\">一</button><br /><br />"
}

function insertRow4EquivalenceClassTable(tableId) {
    tr = insertRow4Table(tableId)
    tr.cells[0].contentEditable = false
    tr.cells[0].innerHTML = "<select><option>有效等价类</option><option>无效等价类</option>"
    return tr
}

function save() {
    var toSave = JSON.stringify(HTML2JSON(), null, 2)
    var softname = document.getElementById("projectNameText").value
    var filename = `${softname}_plan.json`
    saveShareContent(toSave, filename)
}
function generateReport(){
    sessionStorage.setItem("planJSON", JSON.stringify(HTML2JSON()))
    window.location.href = "../render/2-plan.html"
}

function saveShareContent(content, fileName) {
    let downLink = document.createElement('a')
    downLink.download = fileName
    // 字符内容转换为blob地址
    let blob = new Blob([content])
    downLink.href = URL.createObjectURL(blob)
    // 链接插入到页面
    document.body.appendChild(downLink)
    downLink.click()
    // 移除下载链接
    document.body.removeChild(downLink)
}