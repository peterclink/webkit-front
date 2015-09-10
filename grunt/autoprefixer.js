module.exports = function(grunt) {
	
	grunt.config('autoprefixer', {
		options: {
			browsers: ['last 2 versions', 'ie 9', 'ios 6', 'android 4'],
			map: true
		},
		files: {
			expand: true,
			flatten: true,
			src: 'assets/styles/*.css',
			dest: 'assets/styles'
		}
	});
	
	grunt.loadNpmTasks('grunt-autoprefixer');
};