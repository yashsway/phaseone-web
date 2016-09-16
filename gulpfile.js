var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require("del");
var browserify = require('browserify');
var gutil = require('gulp-util');
var tap = require('gulp-tap');


gulp.task("babel", function () {
  return gulp.src(['js/*.js','!js/plugins.js','!js/vendor'])
    .pipe(babel())
    .pipe(gulp.dest("build/", {"overwrite": true}));
});
gulp.task("browserify", function(){
	return gulp.src("build/*.js")
	.pipe(tap(function(file){
		gutil.log('bundling ' + file.path);
		file.contents = browserify(file.path,{debug:true}).bundle();
	}))
	.pipe(gulp.dest("build/",{"overwrite":true}));
});

gulp.task("clean",function() {
    del(['build/*.js']);
});
