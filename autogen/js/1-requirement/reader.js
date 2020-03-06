function requirement2JSON() {
    var json = {
        "projectIntroduction": {
            "projectName": document.getElementById("projectNameText").value,
            "projectTeam": document.getElementById("projectTeamText").value,
            "writer": document.getElementById("writerText").value,
            "completionDate": document.getElementById("completionDateText").value,
            "background": document.getElementById("projectBackgroundTextarea").value,
            "introduction": document.getElementById("projectIntroductionTextarea").value,
            "terms": []
        },
        "requirements": [],
        "performance": {
            "useablities": [],
            "safty": [],
            "performance": [],
            "runningEnvironment": []
        },
        "testSpecification": []
    }

    var table = document.getElementById("termTable")
    var rows = table.rows
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells
        json.projectIntroduction.terms.push({ "term": cells[0].innerHTML, "explanation": cells[1].innerHTML })
    }

    var requirements = document.getElementById("requirementDiv").getElementsByTagName("div")
    Array.from(requirements).forEach(req => {
        var tables = req.getElementsByTagName("table")
        var node = {
            "code": tables[0].rows[0].cells[1].innerHTML,
            "name": tables[0].rows[1].cells[1].innerHTML,
            "description": tables[0].rows[2].cells[1].innerHTML,
            "children": [],
            "IOs": []
        }
        for (var i = 1; i < tables[1].rows.length; i++) {
            node.children.push({
                "code": tables[1].rows[i].cells[0].innerHTML,
                "name": tables[1].rows[i].cells[1].innerHTML,
                "description": tables[1].rows[i].cells[2].innerHTML,
                "output": tables[1].rows[i].cells[3].innerHTML
            })
        }
        for (var i = 1; i < tables[2].rows.length; i++) {
            node.IOs.push({
                "code": tables[2].rows[i].cells[0].innerHTML,
                "name": tables[2].rows[i].cells[1].innerHTML,
                "methon": tables[2].rows[i].cells[2].innerHTML,
                "output": tables[2].rows[i].cells[3].innerHTML,
                "next": tables[2].rows[i].cells[4].innerHTML
            })
        }
        json.requirements.push(node)
    })

    table = document.getElementById("performanceTable")
    rows = table.rows
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells
        var node = {
            "code": cells[1].innerHTML,
            "description": cells[2].innerHTML
        }
        switch (cells[0].children[0].selectedIndex) {
            case 0:
                json.performance.useablities.push(node)
                break
            case 1:
                json.performance.safety.push(node)
                break
            case 2:
                json.performance.performance.push(node)
                break
            case 3:
                json.performance.runningEnvironment.push(node)
                break
        }
    }

    table = document.getElementById("testTable")
    rows = table.rows
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells
        json.testSpecification.push({ "code": cells[0].innerHTML, "type": cells[1].innerHTML, "density": cells[2].innerHTML })
    }
    return json
}