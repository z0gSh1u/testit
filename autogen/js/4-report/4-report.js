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
                }
            ]
        }]
    })
    isResultAnalyzed = true
}

async function generateReport() {
    if(!isResultAnalyzed) {
        alert("请先导入测试结果json文件并完成自动分析")
        return
    }
    sessionStorage.setItem("reportJSON", JSON.stringify(await HTML2JSON()))
    window.location.href = "../render/4-report.html"
}