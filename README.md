# Makefile 

## 快速创建 项目目录结构
- 参数传递： make create dir=p_xxx

##  编译打包(make b env=pro)
- 参数 env
	pro: 上线
	dev: 线上测试
    local: 本地


## 项目中 ajax接口请求配置 格式 demo(参见项目p_yearnews):
```
var APIPATH = {
	pro: "/",
	dev: "http://testdev.yeezan.com/",
	local: "./"
}

var basePath = APIPATH['local'] || "./";

module.exports = {
	list: basePath + "api/event/annual_report_list",
	data: basePath + "api/event/annual_report_data",
	login: basePath + "api/event/annual_report_login"
}
```