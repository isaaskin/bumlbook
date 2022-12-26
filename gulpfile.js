const { task, series, src, dest } = require('gulp');

const rename = require('gulp-rename')
const pegjs = require('gulp-pegjs');
const tspegjs = require('ts-pegjs');
const webpack = require('webpack-stream');


const buildOptions = {
    format: 'commonjs',
    plugins: [tspegjs],
    tspegjs: {
      customHeader: '// import types\nimport * as types from \'./types\';',
    },
    returnTypes: {
      'PlantUMLFile': 'types.UML[]',
    },
  };

function build(cb) {
    src('src/plantuml.pegjs')
      .pipe(
      pegjs({
          ...buildOptions,
      }).on('error', (e) => {
          log.error(e);
          cb(e.message);
      }),
      )
      .pipe(
      rename('plantuml.ts'),
      )
      .pipe(
      dest("./src/"),
      ),
    cb();
}

function bundle(cb) {
  src('./src/index.ts')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(dest('dist/'))
  cb();
}

task('default',
  series(
    build,
    bundle
  ),
);
