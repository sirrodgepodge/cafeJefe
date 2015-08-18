module.exports = function(grunt) {
    //config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false,
                beautify: true
            },
            build: {
                src: 'assets/javascripts/index.js',
                dest: 'public/javascripts/index.min.js'
            }
        },
        scsslint: {
            allFiles: [
                'assets/stylesheets/*.scss'
            ],
            options: {
                colorizeOutput: true,
                compact: true,
                force: true
            }
        },
        jshint: {
            options: {
                curly: false,
                browser: true,
                browserify: true,
                globals: {
                    jQuery: true
                },
                force: true
            },
            all: ['Gruntfile.js', 'assets/javascripts/*.js']
        },
        exec: {
            browserifying: {
                cmd: 'echo heyhey'
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-exec');

    // Set default tasks
    grunt.registerTask('default', ['uglify', 'scsslint', 'jshint', 'exec']);
};
