var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var exec = require("child-exec");
var fs = require("fs");
var opn = require("opn");
var ip = require("ip");
var livereload = require('livereload');
var gulp = require("gulp");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var myIp = ip.address();
var port = 4003;
var url = "http://" + myIp + ":" + port;


var livereloadScript = "<script>document.write('<script src=\"http:\/\/' + (location.host || 'localhost').split(':')[0] + ':35726/livereload.js?snipver=1\"></' + 'script>')</script>";



var replaceIncludeHtml = function (content){
    var reg = /<!--#include\s+file="(.*?)"\s+-->/;
    var match = content.match(reg);
    var ret = content;

    if (!!match) {
        ret = content.replace(match[0], fs.readFileSync("./" + match[1], "utf-8"));
        ret = replaceIncludeHtml(ret);
    }

    return ret;
};



app.get("/", function (req, res){
    var dir = fs.readdirSync(__dirname);
    var projects = dir.filter(function (item){
        return item.match(/^p_.+$/)
    });

    var htmls = projects.map(function(index, elem) {
        return '<li><a href="'+index+'/index.html">'+index+'</a></li>';
    });


    var template = [
        '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport"content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1,user-scalable=no"><title>易赞H5</title><style>a{text-decoration:none}li{padding:3px 0}</style></head><body><!--h5 index--><h2 style="text-align: center; font-size: 1.5rem; color: #f90;">welcome to yeezan h5 index</h2><ul id="ProjectList">',
        htmls.join(""),
        '</ul></body></html>'
    ];
    res.end(template.join(""));
    
})

app.get("/**/*.html", function(req, res) {
	var url = req.url;
	var file = url.split("?")[0];

	var content = fs.readFileSync("." + file, "utf-8");
    content = replaceIncludeHtml(content);
	content = content.replace("</body>", livereloadScript + "</body>")
	res.end(content);

});


app.all("*", function(req, res, next) {
	var url = req.url;
	if(/api/.test(url)){
		var file = url.split("?")[0];
		var content = fs.readFileSync("." + file, "utf-8");
		res.writeHead(200,{
			'Content-Type': 'text/plain;charset=utf-8'
		});
		res.end(content);
	}else{
		next();
	}
});

/**
 * 处理ajax请求
 */
app.post("/p_house/api/data", function (req, res){

	var imgData = req.body.saveImg,
    base64Data = imgData.replace(/^data:image\/\w+;base64,/, ""),
        dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile("out2.jpg", dataBuffer, function(err) {
        if(err){
            res.send(err);
        }else{
        	gulp.src("out2.jpg")
        		.pipe(gulp.dest("p_house/images/"))
            res.send("images/out2.jpg");
            setTimeout(function (){
            	exec("rm out2.jpg");
            }, 200)
        }
    });
})


app.use(express.static(__dirname + '/'));
//livereload
var server = livereload.createServer({
    port: 35726
});

// 项目路径,监控
var curProject = require("./projects");
var projectPath = [__dirname + '/' + curProject];

server.watch(projectPath);





var onRequest = function (req, res){
	console.log("http://" + myIp + ":" + port);
}

app.listen(port, onRequest);

opn(url);

exec("gulp watch");