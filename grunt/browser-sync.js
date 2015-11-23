module.exports = function(grunt) {
	
	grunt.config('browserSync', {
		bsFiles: {
			src: 'dist/styles/**.css'
		},
		options: {
			watchTask: true,
			notify: false,
			// Caso o projeto esteja rodando de forma estática (HTML only) usar o Server
			// Caso o projeto esteja rodando de forma dinâmica (integrado com BED) usar o proxy
			server: {
				baseDir: './'
			},
			// proxy: 'localhost.nome-do-projeto' // Colocar o endereço da cópia local
		}
	});
	
	grunt.loadNpmTasks('grunt-browser-sync');
};