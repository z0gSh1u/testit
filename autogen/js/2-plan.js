// ========================
// | 测试计划文档生成DOM操作 |
// ========================

function createTestFocus(divId) {
	newDiv = createDiv()
	document.getElementById(divId).appendChild(newDiv)
	newDiv.innerHTML += "<b>功能：</b><input type='text' style='width:50%'>&nbsp;<button onclick=\"deleteDiv('" + newDiv.id + "')\">删除</button><br />"
	newTestFocusDiv = createDiv()
	newTestFocusDiv.style = "display:inline"
	newDiv.appendChild(newTestFocusDiv)
	newDiv.innerHTML += "<button onclick=\"insertRow4List('" + newTestFocusDiv.id + "')\">十</button> <button onclick=\"deleteRow4List('" + newTestFocusDiv.id + "')\">一</button>"
	newDiv.innerHTML += "<br /><br />"
}

function createGenerationMethod(divId) {
	newDiv = createDiv()
	document.getElementById(divId).appendChild(newDiv)
	newDiv.innerHTML += "代号：<input type='text' style='width:50%;display:inline-block;' class='form-control'>"
	newDiv.innerHTML += "&nbsp;<button onclick=\"deleteDiv('" + newDiv.id + "')\">删除</button>"
	newDiv.innerHTML += "<br />功能：<input type='text' style='width:80%;display:inline-block;' class='form-control'><br />"
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

function generateReport() {
	sessionStorage.setItem("planJSON", JSON.stringify(HTML2JSON()))
	window.location.href = "../render/2-plan.html"
}

function HTML2JSON() {
	var json = {
		"projectBasicInfo": {
			"projectName": document.getElementById("projectNameText").value,
			"projectTeam": document.getElementById("projectTeamText").value,
			"writer": document.getElementById("writerText").value,
			"completionDate": dateFormat(document.getElementById("completionDateText").value)
		},
		"summary": {
			"introduction": document.getElementById("testIntroductionTextarea").value.replace(/\n/g, "<br/>"),
			"resourcesAndTools": document.getElementById("resourcesAndToolsTextarea").value.replace(/\n/g, "<br/>"),
			"schedulePlan": table2JSON("planTable", ["code", "explain", "manday"]),
			"testSubmission": list2JSON("testSubmissionDiv"),
			"entryStandards": list2JSON("entryStandardsDiv"),
			"exitStandards": list2JSON("exitStandardsDiv")
		},
		"focusAndSequence": {
			"risks": table2JSON("riskTable", ["code", "mode", "effect", "priority"]),
			"focus": [],
			"generationMethod": {
				"classDivision": {
					// @ deprecated field
					"blabla": "",
					"function": []
				},
				"other": document.getElementById("otherDivisionMethodTextarea").value.replace(/\n/g, "<br/>")
			}
		},
		"reference": list2JSON("referenceDiv")
	}

	var testFocusDivs = document.getElementById("testFocusDiv").getElementsByTagName("div")
	Array.from(testFocusDivs).forEach(testFocusDiv => {
		if (testFocusDiv.parentNode.id == "testFocusDiv") {
			json.focusAndSequence.focus.push({
				"name": testFocusDiv.getElementsByTagName("input")[0].value,
				"function": list2JSON(testFocusDiv.getElementsByTagName("div")[0].id)
			})
		}
	})

	var classDivisionDivs = document.getElementById("classDivisionDiv").getElementsByTagName("div")
	Array.from(classDivisionDivs).forEach(classDivisionDiv => {
		if (classDivisionDiv.parentNode.id == "classDivisionDiv") {
			json.focusAndSequence.generationMethod.classDivision.function.push({
				"code": classDivisionDiv.getElementsByTagName("input")[0].value,
				"function": classDivisionDiv.getElementsByTagName("input")[1].value,
				"classes": tableWithSelect2JSON(classDivisionDiv.getElementsByTagName("table")[0].id, ["class", "example"], ["valid", "invalid"])
			})
		}
	})

	return json
}

function JSON2HTML(json) {
	var markdown = ""
	markdown += "# " + json.projectBasicInfo.projectName + " 测试计划\n\n"
	markdown += "## 一、基本信息\n\n"
	markdown += "**产品名称：**" + json.projectBasicInfo.projectName + "\n\n"
	markdown += "**项目承担部门：**" + json.projectBasicInfo.projectTeam + "\n\n"
	markdown += "**撰写人：**" + json.projectBasicInfo.writer + "\n\n"
	markdown += "**完成日期：**" + json.projectBasicInfo.completionDate + "\n\n"
	markdown += "## 二、概述\n\n"
	markdown += "### 2.1 测试简介\n\n"
	markdown += json.summary.introduction + "\n\n"
	markdown += "### 2.2 资源和工具\n\n"
	markdown += json.summary.resourcesAndTools + "\n\n"
	markdown += "### 2.3 测试进度计划\n\n"
	markdown += "| 任务号 | 解释 | 工时（人日） |\n| ------ | ---- | ------------ |\n"
	json.summary.schedulePlan.forEach(e => {
		markdown += "| " + e.code + " | " + e.explain + " | " + e.manday + " |\n"
	});
	markdown += "\n"
	markdown += "### 2.4 测试提交物\n\n"
	json.summary.testSubmission.forEach(e => {
		markdown += "- " + e + "\n"
	})
	markdown += "\n"
	markdown += "### 2.5 进入标准\n\n"
	json.summary.entryStandards.forEach(e => {
		markdown += "- " + e + "\n"
	})
	markdown += "\n"
	markdown += "### 2.6 退出标准\n\n"
	json.summary.exitStandards.forEach(e => {
		markdown += "- " + e + "\n"
	})
	markdown += "\n"
	markdown += "## 三、测试重点及顺序\n\n"
	markdown += "### 3.1 质量风险摘要表\n\n"
	markdown += "| 风险编号 | 故障模式 | 故障效果 | 优先级 |\n| -------- | ------------ | -------- | ------ |\n"
	json.focusAndSequence.risks.forEach(e => {
		markdown += "| " + e.code + " | " + e.mode + " | " + e.effect + " | " + e.priority + " |\n"
	})
	markdown += "\n"
	markdown += "### 3.2 测试重点\n\n"
	json.focusAndSequence.focus.forEach(func => {
		markdown += "#### 3.2.1 " + func.name + "功能\n\n"
		func.function.forEach(e => {
			markdown += "- " + e + "\n"
		})
		markdown += "\n"
	})
	markdown += "### 3.3 测试用例生成方法\n\n"
	markdown += "#### 3.3.1 等价类划分\n\n"
	markdown += json.focusAndSequence.generationMethod.classDivision.blabla + "\n\n"
	json.focusAndSequence.generationMethod.classDivision.function.forEach(func => {
		markdown += "- 代码：" + func.code + "\n\n"
		markdown += "  功能：" + func.function + "功能\n\n"
		markdown += "  |            | 等价类 | 例子 |\n  | ---------- | ------ | ---- |\n"
		func.classes.valid.forEach(e => {
			markdown += "| 有效等价类 | " + e.class + " | " + e.example + " |\n"
		})
		func.classes.invalid.forEach(e => {
			markdown += "| 无效等价类 | " + e.class + " | " + e.example + " |\n"
		})
		markdown += "\n\n"
	})
	markdown += "#### 3.3.2 其他\n\n"
	markdown += json.focusAndSequence.generationMethod.other + "\n\n"
	markdown += "## 四、参考文档\n\n"
	json.reference.forEach(e => {
		markdown += "- " + e + "\n"
	})
	return marked(markdown)
}