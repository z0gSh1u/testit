var divCnt = 0

function createDiv() {
    var newDiv = document.createElement("div")
    newDiv.id = "div" + divCnt++
    return newDiv
}

var tableCnt = 0

function createTable(border = 1) {
    var newTable = document.createElement("table")
    newTable.id = "table" + tableCnt++
    newTable.border = border
    return newTable
}

function deleteDiv(divId) {
    dyingDiv = document.getElementById(divId)
    dyingDiv.parentNode.removeChild(dyingDiv)
}

function insertRow4Table(tableId) {
    table = document.getElementById(tableId)
    tr = table.insertRow(table.rows.length)
    for (var i = 0; i < table.rows.item(0).cells.length; i++) {
        td = tr.insertCell(i)
        td.contentEditable = true
    }
    return tr
}

function deleteRow4Table(tableId) {
    table = document.getElementById(tableId)
    trAmt = table.rows.length
    if (trAmt > 1) {
        table.deleteRow(trAmt - 1)
    }
}

function insertRow4List(divId) {
    div = document.getElementById(divId)
    newDiv = document.createElement("div")
    newDiv.style = 'display:inline'
    newDiv.innerHTML = "<b>· </b><input style='width:99%' type='text'>"
    div.appendChild(newDiv)
}

function deleteRow4List(divId) {
    div = document.getElementById(divId)
    div.removeChild(div.lastElementChild)
}

function table2JSON(tableId, thArr) {
    var ret = []
    var table = document.getElementById(tableId)
    var trs = table.rows
    for (var i = 1; i < trs.length; i++) {
        var rowContent = {}
        var cells = trs[i].cells
        for (var j = 0; j < cells.length; j++) {
            rowContent[thArr[j]] = cells[j].innerHTML
        }
        ret.push(rowContent)
    }
    return ret
}

function tableWithSelect2JSON(tableId, thArr, options, selectCol = 0) {
    var ret = {}
    options.forEach(option => {
        ret[option] = []
    })
    var table = document.getElementById(tableId)
    var trs = table.rows
    for (var i = 1; i < trs.length; i++) {
        var rowContent = {}
        var cells = trs[i].cells
        for (var j = 0; j < cells.length; j++) {
            if (j == selectCol) {
                continue
            }
            rowContent[thArr[j - (j > selectCol)]] = cells[j].innerHTML
        }
        ret[options[cells[0].children[selectCol].selectedIndex]].push(rowContent)
    }
    return ret
}

function list2JSON(listDivId) {
    var ret = []
    var inputs = document.getElementById(listDivId).getElementsByTagName("input")
    Array.from(inputs).forEach(input => {
        ret.push(input.value)
    })
    return ret
}

function dateFormat(date) {
    if (date == "") {
        return ""
    }
    var num = date.split("-")
    var res = ""
    var units = ["年", "月", "日"]
    for (var i = 0; i < num.length; i++) {
        res += (num[i][0] == "0" ? num[i][1] : num[i]) + units[i]
    }
    return res
}