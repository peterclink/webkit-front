module.exports = function(grunt) {
	
	grunt.config('sass', {
		dist: {
			options: {
				style: 'expanded'
			},
			files: {
				'dist/styles/style.css': 'source/styles/style.scss',
				//'dist/styles/nome-do-estilo.css': 'source/styles/nome-do-estilo.scss'

				/*
					Caso seja necessário utilizar o CSS de algum plugin instalado pelo bower, 
					descomentar a linha abaixo e informar o caminho do arquivo.
				*/
				/*
					'dist/styles/plugins.css': [
						'source/styles/nome-do-estilo.scss',
						'source/styles/nome-do-estilo2.scss'
					]
				*/
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-sass');
};