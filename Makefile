ifdef ($(dir))
	dir = $(dir)
else
	dir = p_test
endif


ifdef ($(env))
	env = $(env)
else
	env = ""
endif

server:
	node app
s:
	make server
build:
	gulp clean
	gulp scripts --env $(env)
	@# gulp uglifyinfo
	gulp sass
	gulp build --env $(env)
	@# gulp htmlmin
b: 
	make build

create:
	mkdir $(dir) $(dir)/sass $(dir)/js $(dir)/api $(dir)/js/entry $(dir)/js/api.js $(dir)/images
