module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 

	grunt.loadNpmTasks('grunt-contrib-csslint');

	grunt.initConfig({
	    eslint: {
	        options: {
	            configFile: 'conf/eslint.json'
	        },
	        target: ['js/*.js']
	    },
	    csslint: {
		  strict: {
		    options: {
		      import: 2
		    },
		    src: ['css/*.css']
		  }
		}
	});

	grunt.task.registerTask('default', ['eslint','csslint']);

};