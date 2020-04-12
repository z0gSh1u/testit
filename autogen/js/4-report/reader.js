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