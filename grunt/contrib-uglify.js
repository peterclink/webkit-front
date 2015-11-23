module.exports = function(grunt) {
	
	grunt.config('uglify', {
		plugins: {
			options: {
				sourceMap: 'dist/scripts/plugins.js.map',
				sourceMappingURL: 'plugins.js.map',
				sourceMapPrefix: 2
			},
			files: {
				'dist/scripts/plugins.min.js': [
					'source/scripts/source/plugins.js',
					'source/bower_components/jquery-placeholder/jquery.placeholder.js',
					'source/bower_components/jquery-validate/dist/jquery.validate.js',
					'source/bower_components/jquery-mask-plugin/src/jquery.mask.js',
					//'source/scripts/vendor/pluginname/pluginnanme.js'
				],
				'dist/scripts/vendor/jquery.min.js': 'source/bower_components/jquery-1.11.2.min/index.js'
			}
		},
		main: {
			options: {
				sourceMap: 'dist/scripts/main.js.map',
				sourceMappingURL: 'main.js.map',
				sourceMapPrefix: 2
			},
			files: {
				'dist/scripts/main.min.js': [
					'source/scripts/main.js'
				]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
};