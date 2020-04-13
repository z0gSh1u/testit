// ========================
// | 测试需求文档生成DOM操作 |
// ========================

/**
* 性能要求表DOM操作
*/
function insertRow4PerformanceTable(tableId) {
	tr = insertRow4Table(tableId)
	tr.cells[0].contentEditable = false
	tr.cells[0].innerHTML = "<select><option>可用性</option><option>安全性</option><option>性能</option><option>运行环境</option></select>"
	return tr
}

/**
 * 具体需求表DOM操作
 */
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

/**
 * 创建JSON描述
 */
function HTML2JSON() {
	var json = {
		"projectIntroduction": {
			"projectName": document.getElementById("projectNameText").value,
			"projectTeam": document.getElementById("projectTeamText").value,
			"writer": document.getElementById("writerText").value,
			"completionDate": dateFormat(document.getElementById("completionDateText").value),
			"background": document.getElementById("projectBackgroundTextarea").value.replace(/\n/g, "<br/>"),
			"introduction": document.getElementById("projectIntroductionTextarea").value.replace(/\n/g, "<br/>"),
			"terms": table2JSON("termTable", ["term", "explanation"])
		},
		"requirements": [],
		"performance": tableWithSelect2JSON("performanceTable", ["description", "code"], ["useablities", "safety", "performance", "runningEnvironment"]),
		"testSpecification": table2JSON("testTable", ["code", "type", "density"])
	}

	var requirements = document.getElementById("requirementDiv").getElementsByTagName("div")
	Array.from(requirements).forEach(req => {
		var tables = req.getElementsByTagName("table")
		json.requirements.push({
			"code": tables[0].rows[0].cells[1].innerHTML,
			"name": tables[0].rows[1].cells[1].innerHTML,
			"description": tables[0].rows[2].cells[1].innerHTML,
			"children": table2JSON(tables[1].id, ["code", "name", "description", "output"]),
			"IOs": table2JSON(tables[2].id, ["code", "name", "method", "output", "next"])
		})
	})

	return json
}

/**
 * 生成报告
 */
function generateReport() {
	sessionStorage.setItem("requirementJSON", JSON.stringify(HTML2JSON()))
	window.location.href = "../render/1-requirement.html"
}

/**
 * 渲染结果 
 */
function JSON2HTML(json) {
	var markdown = ""
	markdown += "# " + json.projectIntroduction.projectName + " 测试需求报告\n\n"
	markdown += "## 一、基本信息\n\n"
	markdown += "**产品名称：**" + json.projectIntroduction.projectName + "\n\n"
	markdown += "**项目承担部门：**" + json.projectIntroduction.projectTeam + "\n\n"
	markdown += "**撰写人：**" + json.projectIntroduction.writer + "\n\n"
	markdown += "**完成日期：**" + json.projectIntroduction.completionDate + "\n\n"
	markdown += "## 二、被测试软件项目介绍\n\n"
	markdown += "### 2.1 软件背景\n\n"
	markdown += json.projectIntroduction.background + "\n\n"
	markdown += "### 2.2 软件介绍\n\n"
	markdown += json.projectIntroduction.introduction + "\n\n"
	markdown += "### 2.3 术语\n\n"
	markdown += "| 缩写词或术语 | 解释 |\n| ------------ | ---- |\n"
	json.projectIntroduction.terms.forEach(e => {
		markdown += "| " + e.term + " | " + e.explanation + " |\n"
	});
	markdown += "\n"
	markdown += "## 三、测试需求分析\n\n"
	markdown += "### 3.1 功能测试需求\n\n"
	for (var i = 0; i < json.requirements.length; i++) {
		var r = json.requirements[i]
		markdown += "#### 3.1." + (i + 1) + " " + r.name + "功能的需求分析\n\n"
		markdown += "- **功能需求编码：**" + r.code + "\n"
		markdown += "- **功能需求名称：**" + r.name + "\n"
		markdown += "- **功能描述：**" + r.description + "\n\n"
		markdown += "| 子功能编码 | 子功能名称 | 子功能描述 | 输出 |\n| ---------- | ---------- | ---------- | ---- |\n"
		r.children.forEach(e => {
			markdown += "| " + e.code + " | " + e.name + " | " + e.description + " | " + e.output + " |\n"
		})
		markdown += "\n"
		markdown += "| 输入编码 | 输入内容 | 输入方式 | 输出 | 后继输入 |\n| -------- | -------- | -------- | ---- | -------- |\n"
		r.IOs.forEach(e => {
			markdown += "| " + e.code + " | " + e.name + " | " + e.method + " | " + e.output + " | " + e.next + " |\n"
		})
		markdown += "\n"
	}
	markdown += "### 3.2 系统性能及可用性要求\n\n"
	markdown += "| 性质 | 对系统的要求 | 编码 |\n| ---- | ------------ | ---- |\n"
	json.performance.useablities.forEach(e => {
		markdown += "| 可用性 | " + e.description + " | " + e.code + " |\n"
	})
	json.performance.safety.forEach(e => {
		markdown += "| 安全性 | " + e.description + " | " + e.code + " |\n"
	})
	json.performance.performance.forEach(e => {
		markdown += "| 性能 | " + e.description + " | " + e.code + " |\n"
	})
	json.performance.runningEnvironment.forEach(e => {
		markdown += "| 运行环境 | " + e.description + " | " + e.code + " |\n"
	})
	markdown += "\n"
	markdown += "## 四、测试规格评估\n\n"
	markdown += "| 序号 | 测试类型 | 测试用例密度 |\n| ---- | -------- | ------------ |\n"
	json.testSpecification.forEach(e => {
		markdown += "| " + e.code + " | " + e.type + " | " + e.density + " |\n"
	})
	return marked(markdown)
}