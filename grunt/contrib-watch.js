module.exports = function(grunt) {
	
	grunt.config('watch', {
		sass: {
			files: ['source/styles/**/*.{scss,sass}'],
			tasks: ['sass', 'autoprefixer', 'cssmin']
		},
		js: {
			files: '<%= jshint.all %>',
			tasks: ['jshint', 'uglify']
		},
		images: {
			files: ['dist/images/**/*.{png,jpg,gif}'],
			tasks: ['imagemin']
		},
		livereload: {
			options: { livereload: true },
			files: ['**/*.{html,php}', 'dist/styles/geral.css', 'dist/scripts/*.js', 'dist/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
};