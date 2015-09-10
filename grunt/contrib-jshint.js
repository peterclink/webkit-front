module.exports = function(grunt) {
	
	grunt.config('jshint', {
		options: {
			jshintrc: './grunt/.jshintrc',
			"force": true
		},
		all: [
			'Gruntfile.js',
			'assets/scripts/source/*.js'
		]
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
};