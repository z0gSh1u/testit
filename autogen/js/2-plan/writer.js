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