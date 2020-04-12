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