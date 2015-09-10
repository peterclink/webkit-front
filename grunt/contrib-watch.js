module.exports = function(grunt) {
	
	grunt.config('watch', {
		sass: {
			files: ['assets/styles/source/**/*.{scss,sass}'],
			tasks: ['sass', 'autoprefixer', 'cssmin']
		},
		js: {
			files: '<%= jshint.all %>',
			tasks: ['jshint', 'uglify']
		},
		images: {
			files: ['assets/images/**/*.{png,jpg,gif}'],
			tasks: ['imagemin']
		},
		livereload: {
			options: { livereload: true },
			files: ['**/*.{html,php}', 'assets/styles/geral.css', 'assets/scripts/*.js', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
};