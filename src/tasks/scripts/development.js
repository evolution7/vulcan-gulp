import browserify from 'browserify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import watchify from 'watchify';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import notify from 'gulp-notify';
import size from 'gulp-size';
import { get } from 'browser-sync';

const browserSync = get('developmentServer');

function handleErrors(...args) {
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    this.emit('end');
}

module.exports = function (gulp, config) {
    function tasks(stream) {
        const s = size({ showFiles: true });

        return stream
            .on('error', handleErrors)
            .on('end', function () {
                browserSync.reload();
            })
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(s)
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.scripts.output));
    }

    function createBundle(watch) {
        let bundler = browserify({ debug: true });
        bundler = watch ? watchify(bundler) : bundler;

        bundler
            .transform(babelify.configure({
                ignore: /(bower_components)|(node_modules)/
            }))
            .transform(debowerify, { preferNPM: true })
            .require(config.scripts.source, { entry: true })
            .on('update', function () {
                tasks(bundler.bundle());
            });

        return tasks(bundler.bundle());
    }

    gulp.task('scripts:development', ['lint:build'], function () {
        return createBundle(false);
    });

    gulp.task('scripts:watch', ['lint:build'], function () {
        return createBundle(true);
    });
};
