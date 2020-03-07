function JSON2HTML(json){
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
    for(var i=0;i < json.requirements.length;i++){
        var r = json.requirements[i]
        markdown += "#### 3.1." + (i+1) + " " + r.name + "功能的需求分析\n\n"
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