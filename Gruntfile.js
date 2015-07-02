module.exports = function(grunt) {
    //config
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
	    options: {
		banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
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
	exec: {
	    browserifying: {
		cmd: 'echo heyhey'
	    },
	    npmStarting: {
		cmd: 'npm start'
	    }
	}
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-exec');
    
    // Set default tasks
    grunt.registerTask('default', ['uglify','scsslint','exec']);
};
