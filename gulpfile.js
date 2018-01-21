var gulp = require("gulp"),
watch = require("gulp-watch"),
sass = require("gulp-sass"),
autoprefixer = require("gulp-autoprefixer"),
browserSync = require("browser-sync").create();


gulp.task("default", function(){
  console.log("hello");
});

gulp.task("sass", function(){
  return gulp.src("App/assets/styles/styles.scss")
    .pipe(sass({includePaths: [
      "../../../node_modules/normalize-scss/sass/",
      "global/"] }))
    .on("error", function(errorInfo){
      console.log(errorInfo);
      this.emit("end");
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest("App/temp/styles"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function(){
  browserSync.init({
    server: {
      baseDir: "App"
    }
  });

  watch("./App/index.html",function(){
    browserSync.reload();
  });

  watch("./App/assets/**/*.scss", function(){
    gulp.start("sass");
  });
});
