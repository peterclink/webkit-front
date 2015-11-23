module.exports = function(grunt) {

    grunt.config('modernizr', {

        dist: {

            devFile: "source/bower_components/modernizr/",

            outputFile: "dist/scripts/vendor/modernizr-custom.js",

            extra: {
                shiv: true,
                printshiv: false,
                load: true,
                mq: true,
                cssclasses: true
            },

            /*
                Adicionar testes que serão utilizados no projeto. Lista de testes disponíveis em:
                https://github.com/Modernizr/modernizr.com/blob/gh-pages/i/js/modulizr.js#L15-157
            */

            tests: [ 'svg', 'touch', 'csstransforms', 'input', 'inputtypes' ],

            parseFiles: true // Não crawlear todos os arquivos do projeto.
        }

    });

    grunt.loadNpmTasks('grunt-modernizr');
};