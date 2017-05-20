var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var cleanCSS = require('gulp-clean-css');
var app ={};

var config = {
    assetsDir: 'public_html',
    sassPattern: 'sass/**/*.scss',
    bowerDir: 'vendor/bower_components'
}
app.addStyle = function(paths, outputFilename) {
    gulp.src(paths)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.concat(outputFilename))
        .pipe(cleanCSS())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('public_html/css'));
}

app.copy = function(srcFiles, outputDir) {
    gulp.src(srcFiles)
        .pipe(gulp.dest(outputDir));
}


gulp.task('styles', function() {
    app.addStyle([
        config.bowerDir+'/bootstrap/dist/css/bootstrap.css',
        config.bowerDir+'/font-awesome/css/font-awesome.css',
        config.assetsDir+'/sass/style.scss',
        config.assetsDir+'/sass/nav.scss'
    ], 'main.css');
});

gulp.task('fonts', function() {
    app.copy(
        config.bowerDir+'/font-awesome/fonts/*',
        'public_html/fonts'
    );
});


gulp.task('watch', function() {
    gulp.watch(config.assetsDir+'/'+config.sassPattern, ['styles'])
});

gulp.task('default', ['styles','fonts','watch']);