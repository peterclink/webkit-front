(function($) {

/*
--------------
VARIÁVEIS
--------------
*/

    var $document = $(document),
        $window   = $(window),
        $body     = $('body');

    /*
        Documento carregado
    */
    $document.ready( function() {

    });

    /*
        Página completamente carregada
    */
    $window.on( 'load', function() {

    });

    /*
        Resize da tela
    */
    $window.on( 'resize', function() {

    });

    /*
        Scroll da tela
    */
    $window.on( 'scroll', function() {

    });

    /*
        Retorno para teclas precionadas
    */
    $document.on( 'keydown', function(e) {
        var tecla = e.keyCode || e.which;

        // ESC
        if( tecla === 27 ) {
            
        }
    });

})(jQuery);

