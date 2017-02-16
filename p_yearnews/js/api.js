var APIPATH = {
	pro: "/",
	dev: "http://testdev.yeezan.com/",
	local: "./"
}

var basePath = APIPATH['dong'] || "./";

module.exports = {
	list: basePath + "api/event/annual_report_list",
	data: basePath + "api/event/annual_report_data",
	login: basePath + "api/event/annual_report_login"
}