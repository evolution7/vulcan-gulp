import modernizr from 'modernizr';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import File from 'vinyl';
import merge from 'gulp-merge';
import Stream from 'stream';

function modernizrStream(name, options) {
    let wasWritten = false;

    return new Stream.Readable({
        objectMode: true,
        read() {
            const self = this;
            modernizr.build(options, function (result) {
                if (!wasWritten) {
                    self.push(new File({
                        path: `${process.cwd()}/${name}`,
                        contents: new Buffer(result)
                    }));

                    wasWritten = true;
                    self.push(null);
                }
            });
        }
    });
}

module.exports = function (gulp, config) {
    gulp.task('izr:build', function () {
        return merge(
            modernizrStream('tmp.js', config.izr),
            gulp.src('node_modules/detectizr/dist/detectizr.js')
        )
        .pipe(concat('izr.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.scripts.output));
    });
};
