module.exports = {
    styles: {
        source: ['./app/styles/app.scss', './app/styles/print.scss'],
        watch: './app/styles/**/*.scss',
        output: './public/styles/',
        autoprefixer: ['> 1%', 'last 3 versions']
    },
    scripts: {
        source: './app/scripts/app.js',
        watch: './app/scripts/**/*.js',
        output: './public/scripts/',
        vendor: './app/scripts/vendor/'
    },
    izr: {
        "classPrefix": "izr-",
        "options": [
            "addTest",
            "setClasses"
        ],
        "feature-detects": [
            "test/geolocation",
            "test/history",
            "test/svg",
            "test/touchevents",
            "test/video",
            "test/css/flexbox",
            "test/window/matchmedia"
        ]
    },
    templates: {
        source: './app/templates/**/*.{html,xml}',
        output: './craft/templates/'
    },
    images: {
        source: './app/images/**/*.{jpg,png,svg,gif}',
        output: './public/images/'
    },
    fonts: {
        source: './app/fonts/**/*{eot,woff,ttf,svg}',
        output: './public/fonts/'
    },
    icons: {
        source: './app/icons/',
        output: './public/i/',
        colours: {
            white: '#FFFFFF',
            black: '#000000',
        }
    },
    browserSync: {
        proxy: 'http://vulcan.dev',
        port: 3000
    }
};
