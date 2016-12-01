import sass from 'gulp-sass';
import cssNano from 'gulp-cssnano';
import rev from 'gulp-rev';
import { gulpSassError } from 'gulp-sass-error';

module.exports = function (gulp, config) {
    gulp.task('styles:production', ['icons:build'], function () {
        return gulp.src(config.styles.source)
            .pipe(
                sass({
                    includePaths: ['bower_components', 'node_modules']
                }).on('error', gulpSassError(true))
            )
            .pipe(cssNano({
                core: true,
                discardComments: {
                    removeAll: true
                },
                autoprefixer: {
                    browsers: config.styles.autoprefixer,
                    flexbox: 'no-2009',
                    add: true
                },
            }))
            .pipe(rev())
            .pipe(gulp.dest(config.styles.output))
            .pipe(rev.manifest({ merge: true }))
            .pipe(gulp.dest('./'));
    });
};
