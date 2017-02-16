var gulp = require('gulp');
var fs = require("fs");
var $ = require('gulp-load-plugins')();

var argv = require('yargs').argv;


var autoprefixer = require('gulp-autoprefixer');

var safeWriteFile = require('safe-write-file');

var outputFileSync = require('output-file-sync');

var del = require("del");


var env = argv.env || "dong";




var curProject = require("./projects");


var base_path = {
    sass: "sass/*.scss",
    css: "css",
    js: "js/**/*",
    startJs: ["js/main.js", "js/entry/*.js"],
    api: "js/api.js",
    build: "build",
    images :"images",
    html: "*.html",
    dist: "dist"
}

var htmls = (function (){
    var dir = fs.readdirSync("./"+curProject);
    return dir.filter(function (item){
        return item.match(/\.html$/);
    });
})();

// 这里配置 当前项目路径
var paths = setPaths(base_path, curProject);

/**
 * api.js [路径固定在 p_xxx/js/api.js]
 * [配置 ajax 请求接口路径]
 * path一般包含三种情况:
 *     1. 打包上线 env = pro
 *     2. 线上测试 env = dev
 *     3. 本地开发 env = local
 * @return {[type]}       [description]
 */
gulp.task('setApiPath', function (){
    var content = fs.readFileSync(paths.api, 'utf8');
    content = content.replace(/basePath\s+=\s+APIPATH\[(.*)\]/g, function (all){
        return all.replace(arguments[1], "'"+env+"'");
    });

    outputFileSync(paths.api, content);
})

gulp.task('scripts', ['setApiPath'], function() {
	gulp.src(paths.startJs)
		.pipe($.browserify({
		  insertGlobals : true
		}))
        // .pipe($.uglify({
        //     compress: {
        //         drop_console: true,
        //         unused: true
        //     }
        // }))
		.pipe(gulp.dest(paths.build))
});

// gulp.task('uglifyinfo', function (){

//     var js = fs.readFileSync(paths.build+"/main.js");
//     safeWriteFile(paths.build+"/min/main.js", "/*" + new Date() + "*/\n" + js);
// })

gulp.task('sass', function () {
    gulp.src(paths.sass)
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
});



gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['scripts']);
});


gulp.task('clean', function () {
    del([paths.dist]);
});

gulp.task("htmlmin", function() {
    gulp.src(paths.dist + "/*.html")
        .pipe($.minifyHtml({
            collapseWhitespace: true,
            minifyJS: false,
            minifyCSS: false
        }))
        .pipe(gulp.dest(paths.dist + "/"));
})

/**
 * [STATICPATH 静态资源 路径]
 * @type {Object}
 */
var STATICPATH = {
    pro: "http://event.yeezan.com/p_yearnews/",
    dev: "http://efstatic.b0.upaiyun.com/eventtest0/p_yearnews/",
    local: ""
}

var staticPath = STATICPATH[env];

gulp.task("build", function() {

    gulp.src(paths.images + "/**/*").pipe(gulp.dest(paths.dist + "/images"));
    gulp.src(paths.css + "/**/*").pipe(gulp.dest(paths.dist + "/css"));
    gulp.src(paths.build + "/**/*")
        .pipe($.uglify({
            compress: {
                drop_console: true,
                unused: true
            }
        }))
        .pipe(getHeader())
        .pipe(gulp.dest(paths.dist + "/js/min"));


    htmls.forEach(function (item, index){
        var content = fs.readFileSync('./'+curProject+item, 'utf8');

        content = replaceIncludeHtml(content);

        content = content.replace(/src=\"build\/[0-9a-z-_\/]+\.js\"/g, function(word) {
            return word.replace('\.js', '.js' + '?' + new Date().getTime().toString(16));
        });

        content = content.replace(/src=\"build\//g, function (item){
            return item.replace('src="build/', 'src="'+staticPath+'js/min/');
        })
        content = content.replace(/href=\"css\//g, function (item){
            return item.replace('href="css/', 'href="'+staticPath+"css/");
        })
        content = content.replace(/src=\"images\//g, function(item) {
            return item.replace('src="images/', 'src="' + staticPath + 'images/');
        });
        safeWriteFile(paths.dist+"/"+item, content);
    })


    // gulp.src(paths.html)
    //     .pipe($.htmlmin({
    //         collapseWhitespace: true,
    //         removeComments: true
    //     }))
    //     .pipe(gulp.dest(paths.dist));

});




gulp.task('default', function () {
	gulp.run("watch");
});


function getHeader() {
    var template = ['/**',
        ' * time: <%= time%>',
        ' * site: <%= site%>',
        ' * contact: <%= blog%>',
        ' */',
        ''
    ].join('\n');
    return $.header(template, {
        time: new Date(),
        site: 'http://www.yeezan.com/',
        blog: 'http://donglegend.com/'
    });
}



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



// 遍历对象
function loopObj( obj, block ) {
    for ( var key in obj ) {
        block( key, obj[key] );
    }
}

function loopArr( arr, block ) {
    for (var i = 0,len = arr.length; i<len; i++) {
        block( i, arr[i] );
    }
}

function insert( obj1, obj2 ) {
    loopObj( obj2, function ( key, value ) {
        obj1[key] = value;
    } );
    return obj1;
}

// 设置项目路径
function setPaths(base_path, pre){
    
    function copy(dest,base_path, pre){

        var target = dest || {};

        var loop = Array.isArray(base_path) ? loopArr : loopObj;

        loop(base_path, function (k, v){
            if(typeof v == "object"){
                target[k] = Array.isArray(v) ? [] : {};
                copy(target[k], v, pre);
            }else{
                target[k] = pre + v;
            }
        })

        return target;
    }

    return copy({},base_path, pre);

}

