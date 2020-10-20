// Initialize Modules
const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

// File Path Variables
const files = {
  scssPath: 'public/scss/**/*.scss'
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
  watch([files.scssPath],
        parallel(scssTask));
}

// Default Task
exports.default = series(
  parallel(scssTask),
  watchTask
);