module.exports = function(grunt) {
	
	grunt.config('imagemin', {
		dist: {
			options: {
				optimizationLevel: 7,
				progressive: true,
				interlaced: true
			},
			files: [{
				expand: true,
				cwd: 'dist/images/',
				src: ['**/*.{png,jpg,gif'],
				dest: 'dist/images/'
			}]
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-imagemin');
};