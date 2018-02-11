var gulp = require("gulp"),
watch = require("gulp-watch"),
sass = require("gulp-sass"),
autoprefixer = require("gulp-autoprefixer"),
imagemin = require("gulp-imagemin"),
del = require("del"),
usemin = require("gulp-usemin"),
rev = require("gulp-rev"),
cssnano = require("gulp-cssnano"),
uglify = require("gulp-uglify"),
browserSync = require("browser-sync").create();


gulp.task("default", function(){
  console.log("hello");
});

gulp.task("sass", function(){
  return gulp.src("App/assets/styles/styles.scss")
    .pipe(sass({includePaths: ["global/"] }))
    .on("error", function(errorInfo){
      console.log(errorInfo);
      this.emit("end");
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest("App/temp/styles"))
    .pipe(browserSync.stream());
});

gulp.task("deleteDistfolder", function(){
  return del("./docs");
});

gulp.task("optimizeImages",["deleteDistfolder"], function(){
  return gulp.src("./App/assets/images/**/*")
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true
    }))
    .pipe(gulp.dest("./docs/assets/images"))
});

gulp.task("usemin",["deleteDistfolder"],function(){
  return gulp.src("./App/*.html")
  .pipe(usemin({
    css:[function(){return rev()}, function(){return cssnano()}],
    js:[function(){return rev()}, function(){return uglify()}]
  }))
  .pipe(gulp.dest("./docs"))
});

gulp.task("build",["deleteDistfolder","optimizeImages", "usemin"]);

gulp.task("watch", function(){
    browserSync.init({
      server: {
        baseDir: "docs"
      },
    });

  watch("./App/*.html",function(){
    browserSync.reload();
  });

  watch("./App/assets/**/*.scss", function(){
    gulp.start("sass");
  });
});
