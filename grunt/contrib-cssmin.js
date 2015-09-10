module.exports = function(grunt) {
	
	grunt.config('cssmin', {
		options: {
			keepSpecialComments: 1
		},
		site: {
			expand: true,
			cwd: 'assets/styles',
			src: ['*.css', '!*.min.css'],
			dest: 'assets/styles',
			ext: '.min.css'
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};