// Initialize Modules
const gulp = require('gulp');
const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-dart-sass');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const webp = require('gulp-webp');

// File Path Variables
const files = {
  scssPath: 'public/scss/**/*.scss'
}

// Images File Path Variables
const imageFiles = {
  pngPath: 'public/img/**/*.png',
  jpgPath: 'public/img/**/*.jpg'
}

// SASS Task
function scssTask(){
  return src(files.scssPath)
         .pipe(sourcemaps.init())
         .pipe(sass())
         .pipe(autoprefixer('last 2 versions'))
         .pipe(postcss([cssnano()]))
         .pipe(sourcemaps.write('.'))
         .pipe(dest('public/dist/css')
  );
}

// Watch Task
function watchTask(){
  watch([files.scssPath, imageFiles.pngPath, imageFiles.jpgPath],
        parallel(scssTask));
}

// WEBP Conversion Tasks

function pngImages(){
  return src(imageFiles.pngPath)
  .pipe(webp())
  .pipe(gulp.dest('public/img')
  );
}

function jpgImages(){
  return src(imageFiles.jpgPath)
  .pipe(webp())
  .pipe(gulp.dest('public/img')
  );
}

// Default Task
exports.default = series(
  parallel(scssTask, pngImages, jpgImages),
  watchTask
);