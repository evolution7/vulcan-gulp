import browserify from 'browserify';
import babelify from 'babelify';
import debowerify from 'debowerify';
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import notify from 'gulp-notify';
import rev from 'gulp-rev';

function handleErrors(...args) {
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>'
    }).apply(this, args);
    process.exit(1);
}

module.exports = function (gulp, config) {
    function tasks(stream) {
        return stream
            .on('error', handleErrors)
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest(config.scripts.output))
            .pipe(rev.manifest({ merge: true }))
            .pipe(gulp.dest('./'));
    }

    gulp.task('scripts:production', function () {
        const bundler = browserify();

        bundler
            .transform(babelify.configure({
                ignore: /(bower_components)|(node_modules)/
            }))
            .transform(debowerify, { preferNPM: true })
            .require(config.scripts.source, { entry: true });

        return tasks(bundler.bundle());
    });
};
