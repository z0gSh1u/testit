function insertRow4PerformanceTable(tableId){
    tr = insertRow4Table(tableId)
    tr.cells[0].contentEditable = false
    tr.cells[0].innerHTML = "<select><option>可用性</option><option>安全性</option><option>性能</option><option>运行环境</option></select>"
    return tr
}

function createRequirements(divId) {
    newDiv = createDiv()
    document.getElementById(divId).appendChild(newDiv)
    newDiv.innerHTML += "<b>功能需求分析：</b><button onclick=\"deleteDiv('" + newDiv.id + "')\">删除</button>"
    tables = [createTable(), createTable(), createTable()]

    newDiv.appendChild(tables[0])
    tr = [tables[0].insertRow(0), tables[0].insertRow(1), tables[0].insertRow(2)]
    tr[0].innerHTML = "<th style='width:30%;'>功能需求编码</th><td contentEditable='true'></td>"
    tr[1].innerHTML = "<th style='width:30%;'>功能需求名称</th><td contentEditable='true'></td>"
    tr[2].innerHTML = "<th style='width:30%;'>功能描述</th><td contentEditable='true'></td>"

    newDiv.appendChild(tables[1])
    tr = tables[1].insertRow(0)
    tr.innerHTML = "<th>子功能编码</th><th>子功能名称</th><th>子功能描述</th><th>输出</th>"

    newDiv.innerHTML += "<button onclick=\"insertRow4Table('" + tables[1].id + "')\">十</button>"
    newDiv.innerHTML += "<button onclick=\"deleteRow4Table('" + tables[1].id + "')\">一</button>"

    newDiv.appendChild(tables[2])
    tr = tables[2].insertRow(0)
    tr.innerHTML = "<th>输入编码</th><th>输入内容</th><th>输入方式</th><th>输出</th><th>后继输入</th>"

    newDiv.innerHTML += "<button onclick=\"insertRow4Table('" + tables[2].id + "')\">十</button>"
    newDiv.innerHTML += "<button onclick=\"deleteRow4Table('" + tables[2].id + "')\">一</button>"
    newDiv.innerHTML += "<br><br>"

    return [tables[0].id, tables[1].id, tables[2].id]
}

function save() {
    var toSave = JSON.stringify(HTML2JSON(), null, 2)
    var softname = document.getElementById("projectNameText").value
    var filename = `${softname}_requirement.json`
    saveShareContent(toSave, filename)
}
function generateReport(){
    sessionStorage.setItem("requirementJSON", JSON.stringify(HTML2JSON()))
    window.location.href = "../render/1-requirement.html"
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