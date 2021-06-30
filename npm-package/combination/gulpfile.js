/*
 * @Author: your name
 * @Date: 2021-06-19 21:07:34
 * @Description: file content
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');

gulp.task('clean', async function() {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

gulp.task('cjs', function() {
  const tsProject = ts.createProject('./tsconfig.json', {
    module: 'CommonJS',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});

gulp.task('es', function() {
  const tsProject = ts.createProject('./tsconfig.json', {
    module: 'ESNext',
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('es/'));
});

gulp.task('declaration', function() {
  const tsProject = ts.createProject('./tsconfig.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('copy', async function() {
  await gulp
    .src('./src/**/*')
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'))
    .pipe(gulp.dest('dist/'));
});

exports.commonTask = gulp.series('clean', 'cjs', 'es', 'declaration');

exports.default = gulp.series(
  'clean',
  // 'cjs',
  // 'es',
  // 'declaration',
  'copy',
);
