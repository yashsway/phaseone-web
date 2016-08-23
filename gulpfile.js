var gulp = require("gulp");
var babel = require("gulp-babel");
var del = require("del");

gulp.task("babel", function () {
  return gulp.src("js/main.js")
    .pipe(babel())
    .pipe(gulp.dest("build/", {"overwrite": true}));
});

gulp.task("clean",function() {
    del(['build/main.js']);
});
