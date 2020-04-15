# testit

本项目为东南大学《软件测试》课程大作业项目。项目分为四大部分：

### document

手工书写的测试需求报告、测试计划书、测试脚本、测试报告，以及相应的用于自动生成的模板Markdown。

### weiweibo

为完成本大作业，我们构建了一款简单的微博系统，作为待测程序。具体请参考`weiweibo/README.md`。

### mini-jest

仿照Jest测试框架制作的简易测试框架。主要支持toBe、toBeArray、toHaveLength、toContain、toNotContain五种断言。`mini-jest/testscript`中展现了手动编写和自动生成的测试脚本、测试脚本描述和测试结果描述文件。

### autogen

自动生成测试需求报告、测试计划书、mini-jest测试脚本、测试报告。具体使用方法演示请查看`autogen/help.html`。

## 如何开始

- 安装Node.js运行环境：https://nodejs.org/zh-cn/

- 在项目根目录执行`npm install`安装项目
- 在项目根目录执行`npm run serve`启动项目
- 自动化测试系统将在`localhost:8888`上运行
- 最后，请使用下列链接之一查看演示视频：
  - http://localhost:8888/help.html
  - http://zxuuu.tech/share/static/testit_demo.mp4
