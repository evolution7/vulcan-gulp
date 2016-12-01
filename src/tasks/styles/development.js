import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import { get } from 'browser-sync';

const browserSync = get('developmentServer');

module.exports = function (gulp, config) {
    gulp.task('styles:development', function () {
        return gulp.src(config.styles.source)
            .pipe(sourcemaps.init())
            .pipe(
                sass({
                    includePaths: ['bower_components', 'node_modules']
                }).on('error', sass.logError)
            )
            .pipe(cssnano({
                core: false,
                autoprefixer: {
                    browsers: config.styles.autoprefixer,
                    flexbox: 'no-2009',
                    add: true
                },
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.styles.output))
            .pipe(browserSync.stream());
    });
};
