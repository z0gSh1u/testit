function requirement2JSON(){
    var json = {"projectIntroduction":{"projectName":document.getElementById("projectNameText").value, 
                                    "projectTeam":document.getElementById("projectTeamText").value, 
                                    "writer":document.getElementById("writerText").value,
                                    "completionDate":document.getElementById("completionDateText").value,
                                    "background":document.getElementById("projectBackgroundTextarea").value, 
                                    "introduction":document.getElementById("projectIntroductionTextarea").value,
                                    "terms":[]},
                "requirements":[],
                "performance":{}}
    var table = document.getElementById("termTable")
    var rows = table.rows
    for(var i=1;i < rows.length;i++){
        var cells = rows[i].cells
        json.projectIntroduction.terms.push({"term":cells[0].innerHTML, "explanation":cells[1].innerHTML})
    }
    
}