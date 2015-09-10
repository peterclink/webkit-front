module.exports = function(grunt) {
	
	grunt.config('uglify', {
		plugins: {
			options: {
				sourceMap: 'assets/scripts/plugins.js.map',
				sourceMappingURL: 'plugins.js.map',
				sourceMapPrefix: 2
			},
			files: {
				'assets/scripts/plugins.min.js': [
					'assets/scripts/source/plugins.js'
					//'source/scripts/vendor/pluginname/pluginnanme.js'
				]
				//,'assets/scripts/vendor/jquery.min.js': 'assets/scripts/source/bower_components/jquery-1.11.2.min/index.js'
			}
		},
		main: {
			options: {
				sourceMap: 'assets/scripts/main.js.map',
				sourceMappingURL: 'main.js.map',
				sourceMapPrefix: 2
			},
			files: {
				'assets/scripts/main.min.js': [
					'assets/scripts/source/main.js'
				]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
};