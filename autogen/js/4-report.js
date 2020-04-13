// ========================
// | 测试报告自动生成DOM操作 |
// ========================

var isResultAnalyzed = false

async function getText(inputId) {
	return new Promise((resolve, reject) => {
		let objFile = document.getElementById(inputId).files[0]
		let reader = new FileReader()
		reader.readAsText(objFile, "UTF-8")
		reader.onload = (event) => {
			resolve(event.target.result)
		}
	})
}

async function analyzeResult(inputId, bugsModuleChartDivId, bugsRateChartDivId) {
	let result = JSON.parse(await getText(inputId))
	let functionAmt = 0,
		caseAmt = 0,
		bugAmt = 0,
		BPM = new Map()
	result.result.forEach(func => {
		functionAmt++
		let moduleName = func.description.split(".")[0]
		if (!BPM.has(moduleName)) {
			BPM.set(moduleName, 0)
		}
		func.body.forEach(caseRes => {
			caseAmt++
			if (caseRes == "FAIL") {
				BPM.set(moduleName, BPM.get(moduleName) + 1)
				bugAmt++
			}
		})
	});
	document.getElementById("projectNameTextInTestSummary").value = result.projectName
	document.getElementById("functionAmtText").value = functionAmt
	document.getElementById("caseAmtText").value = caseAmt
	document.getElementById("CPFText").value = (caseAmt / functionAmt).toFixed(2)
	document.getElementById("BugAmtText").value = bugAmt
	document.getElementById("BPFAmtText").value = (bugAmt / functionAmt).toFixed(2)
	document.getElementById("passRateText").value = (result.passRate * 100).toFixed(2)

	document.getElementById(bugsModuleChartDivId).style = document.getElementById(bugsRateChartDivId).style = "width: 600px;height:400px;"
	echarts.init(document.getElementById(bugsModuleChartDivId)).setOption({
		title: {
			text: "按模块统计的结果"
		},
		tooltip: {},
		legend: {
			data: ["按模块统计的结果"]
		},
		xAxis: {
			data: Array.from(BPM.keys())
		},
		yAxis: {},
		series: [{
			name: "按模块统计的结果",
			type: "bar",
			color: "blue",
			data: Array.from(BPM.values())
		}]
	})
	echarts.init(document.getElementById(bugsRateChartDivId)).setOption({
		title: {
			text: "按测试用例总数统计的结果"
		},
		tooltip: {},
		series: [{
			name: "按测试用例总数统计的结果",
			type: "pie",
			radius: "55%",
			data: [{
				value: bugAmt,
				name: "缺陷"
			},
			{
				value: caseAmt - bugAmt,
				name: "成功"
			}]
		}]
	})
	isResultAnalyzed = true
}

async function generateReport() {
	if (!isResultAnalyzed) {
		alert("请先导入测试结果JSON文件并完成自动分析！")
		return
	}
	sessionStorage.setItem("reportJSON", JSON.stringify(await HTML2JSON()))
	window.location.href = "../render/4-report.html"
}

async function HTML2JSON() {
	var json = {
		"introduction": {
			"basicInformation": {
				"projectName": document.getElementById("projectNameText").value,
				"projectTeam": document.getElementById("projectTeamText").value,
				"writer": document.getElementById("writerText").value,
				"completionDate": dateFormat(document.getElementById("completionDateText").value)
			},
			"purpose": document.getElementById("purposeTextarea").value.replace(/\n/g, "<br/>"),
			"reference": document.getElementById("referenceTextarea").value.replace(/\n/g, "<br/>"),
		},
		"testResultJSON": JSON.parse(await getText("resultInput")),
		"testSummary": {
			"beginMonth": dateFormat(document.getElementById("beginMonth").value),
			"endMonth": dateFormat(document.getElementById("endMonth").value),
			"addition": document.getElementById("testSummaryTextarea").value.replace(/\n/g, "<br/>"),
		},
		"testResult": {
			"bugsAnalysis": document.getElementById("bugsAnalysisTextarea").value.replace(/\n/g, "<br/>"),
		},
		"testConclusion": document.getElementById("testConclusionTextarea").value.replace(/\n/g, "<br/>"),
		"advice": document.getElementById("adviceTextarea").value.replace(/\n/g, "<br/>")
	}
	return json
}

function JSON2HTML(json) {
	var markdown = ""
	markdown += "# " + json.introduction.basicInformation.projectName + " 测试总结报告\n\n"
	markdown += "## 一、引言\n\n"
	markdown += "### 1.1 基本信息\n\n"
	markdown += "**产品名称：**" + json.introduction.basicInformation.projectName + "\n\n"
	markdown += "**项目承担部门：**" + json.introduction.basicInformation.projectTeam + "\n\n"
	markdown += "**撰写人：**" + json.introduction.basicInformation.writer + "\n\n"
	markdown += "**完成日期：**" + json.introduction.basicInformation.completionDate + "\n\n"
	markdown += "### 1.2 编写目的\n\n"
	markdown += json.introduction.purpose + "\n\n"
	markdown += "### 1.3 参考资料\n\n"
	markdown += json.introduction.reference + "\n\n"
	markdown += "## 二、测试概要\n\n"
	markdown += "<div id=\"testSummaryDiv\"></div>"
	markdown += json.testSummary.addition + "\n\n"
	markdown += "## 三、测试结果\n\n"
	markdown += "### 3.1 Bug分布\n\n"
	markdown += "<div id=\"bugsModuleChartDiv\" style=\"width: 600px;height:400px;\"></div>\n\n"
	markdown += "<div id=\"bugsRateChartDiv\" style=\"width: 600px;height:400px;\"></div>\n\n"
	markdown += "### 3.2 Bug详情\n\n"
	markdown += "### 3.3 Bug分析\n\n"
	markdown += json.testResult.bugsAnalysis + "\n\n"
	markdown += "## 四、测试结论\n\n"
	markdown += json.testConclusion + "\n\n"
	markdown += "## 五、建议\n\n"
	markdown += json.advice + "\n\n"
	return marked(markdown)
}

function renderBugsDetail() {
	let result = JSON.parse(await getText('resultInput'))["result"]
	let desc = JSON.parse(await getText('descInput'))["cases"]
	let bugged = []
	for (let i = 0; i < result.length; i++) {
		for (let j = 0; j < result[i]['body'].length; j++) {
			if (result[i]['body'][j] == 'FAIL') {
				// TODO: Detail logic.
			}
		}
	}

}