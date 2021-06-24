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
        configFile: '../../taro-babelrc.json',
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
        configFile: '../../taro-babelrc.json',
      }),
    )
    .pipe(gulp.dest('es/'));
});

gulp.task('declaration', function() {
  const tsProject = ts.createProject('./taro-tsconfig.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(gulp.dest('es/'))
    .pipe(gulp.dest('lib/'));
});

gulp.task('copyReadme', async function() {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});

exports.default = gulp.series(
  'clean',
  'cjs',
  'es',
  'declaration',
  // 'copyReadme',
);
