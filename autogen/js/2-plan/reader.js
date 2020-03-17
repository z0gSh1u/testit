function HTML2JSON() {
    var json = {
        "projectBasicInfo": {
            "projectName": document.getElementById("projectNameText").value,
            "projectTeam": document.getElementById("projectTeamText").value,
            "writer": document.getElementById("writerText").value,
            "completionDate": document.getElementById("completionDateText").value
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
                    "blabla": document.getElementById("classDivisionTextarea").value.replace(/\n/g, "<br/>"),
                    "function": []
                },
                "other": document.getElementById("otherDivisionMethodTextarea").value.replace(/\n/g, "<br/>")
            }
        },
        "reference": list2JSON("referenceDiv")
    }

    var testFocusDivs = document.getElementById("testFocusDiv").getElementsByTagName("div")
    Array.from(testFocusDivs).forEach(testFocusDiv => {
        if(testFocusDiv.parentNode.id == "testFocusDiv") {
            json.focusAndSequence.focus.push({
                "name": testFocusDiv.getElementsByTagName("input")[0].value,
                "function": list2JSON(testFocusDiv.getElementsByTagName("div")[0].id)
            })
        }        
    })

    var classDivisionDivs = document.getElementById("classDivisionDiv").getElementsByTagName("div")
    Array.from(classDivisionDivs).forEach(classDivisionDiv => {
        if(classDivisionDiv.parentNode.id == "classDivisionDiv") {
            json.focusAndSequence.generationMethod.classDivision.function.push({
                "code": classDivisionDiv.getElementsByTagName("input")[0].value,
                "function": classDivisionDiv.getElementsByTagName("input")[1].value,
                "classes": tableWithSelect2JSON(classDivisionDiv.getElementsByTagName("table")[0].id, ["class", "example"], ["valid", "invalid"])
            })
        }
    })

    return json
}