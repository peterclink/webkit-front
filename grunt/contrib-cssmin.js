module.exports = function(grunt) {
	
	grunt.config('cssmin', {
		options: {
			keepSpecialComments: 1
		},
		site: {
			expand: true,
			cwd: 'dist/styles',
			src: ['*.css', '!*.min.css'],
			dest: 'dist/styles',
			ext: '.min.css'
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-cssmin');
};