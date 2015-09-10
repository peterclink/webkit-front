/* ------- VARIÁVEL GLOBAL DO APLICATIVO ------- */
var gpaMulti = gpaMulti || {};

/* -- */

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
--------------
FUNÇÕES
--------------
*/

    /*
        Scroll animado para qualquer elemento da tela
    */

    function scrollTo( $el ) {

        if( $el.length < 1 ) {
            return;
        }

        $( 'html, body' ).animate({
            scrollTop: $el.first().offset().top
        }, 300, 'linear' );
    }



    /*
        Padroniza a altura dos elementos
    */
    function padronizarAltura( $els ) {
        docH = $(document).width();

        if(docH > 767) {
            var altura = 0;

            $els.height( 'auto' );
            $els.each( function() {
                var $this = $( this );

                altura = $this.outerHeight() > altura ? $this.outerHeight() : altura;
            });

            $els.height( altura );
        }
    }



    /*
        Alternar abertura do formulário de busca
    */
    function toggleFormularioBusca( abrir ) {

        var $parent = $( '.navegacao__busca' ),
            $input  = $( '.form__input--busca', $parent );

        if( typeof abrir !== "undefined" && abrir ) {
            $parent.addClass( 'mostrar-busca' );
            $input.focus();
        } else {
            $parent.removeClass( 'mostrar-busca' );
            $input.blur();

            setTimeout( function() {
                $input.val( '' );
            }, 1000 );
        }
    }



    /*
        Alternar abertura do menu em mobile
    */
    function toggleMenu( abrir ) {

        var $menu = $( '.navegacao__menu' );

        if( typeof abrir !== "undefined" && abrir ) {
            $menu.addClass( 'mostrar-menu' );
        } else {
            $menu.removeClass( 'mostrar-menu' );
        }
    }



    /*
        Inicializa FAQ
    */
    function faqInit( $faq ) {

        var $questoes = $( '.faq__questao', $faq );

        $questoes.each( function() {

            var $this     = $( this ),
                $pergunta = $( '.faq__questao__header', $this ),
                $resposta = $( '.faq__questao__resposta', $this ),
                height    = 0;

            // Calcula a altura da pergunta
            $resposta.height( 'auto' );
            height = $resposta.outerHeight();
            $resposta.height( 0 );

            // Desativa FAQs já iniciados
            $pergunta.off( 'click.faq' );
            $questoes.removeClass( 'faq--ativo' );


            $pergunta.on( 'click.faq', function(e) {
                e.preventDefault();

                $this.siblings().removeClass( 'faq--ativo' ).find( '.faq__questao__resposta' ).height( 0 );

                if( $this.hasClass( 'faq--ativo' ) ) {
                    $this.removeClass( 'faq--ativo' );
                    $resposta.height( 0 );
                } else {
                    $this.addClass( 'faq--ativo' );
                    $resposta.height( height );
                }
            });

        });

    }


    /*
        Slide para tipos de cartão - Home e internas
    */

    // sincronizza sliders realizzazioni
    function linkRealSliders(bigS,thumbS){

      $("ul#bxslider-pager").on("click","a",function(event){
        event.preventDefault();
        var newIndex=$(this).parent().attr("data-slideIndex");
            bigS.goToSlide(newIndex);
      });
    }

    //slider!=$thumbSlider. slider is the realslider
    function changeRealThumb(slider,newIndex){

      var $thumbS=$("#bxslider-pager");
      $thumbS.find('.active').removeClass("active");
      $thumbS.find('li[data-slideIndex="'+newIndex+'"]').addClass("active");

      if(slider.getSlideCount()-newIndex>=4)slider.goToSlide(newIndex);
      else slider.goToSlide(slider.getSlideCount()-4);

    }



/*
--------------
TRIGGERS
--------------
*/

    /*
        Documento carregado
    */
    $document.ready( function() {

        // Carrega LiveReload se estiver em ambiente de Desenvolvimento
        if( location.hostname.indexOf( 'localhost' ) !== -1 ) {
            var liveReload = $( '<script />' );
            liveReload
                .attr( 'src', '//localhost:35729/livereload.js' )
                .appendTo( 'body' );
        }



        // Altera urls dos paineis externos caso esteja em hambiente de Homologação
        if( location.hostname.indexOf( 'hmp' ) !== -1 || location.search.indexOf( 'hmp' ) !== -1 ) {
            var urls = [
                {
                    producao   : "https://rh.multibeneficiosgpa.com.br/portal/solicitar-proposta.html",
                    homologacao: "https://rhhmp.multibeneficiosgpa.com.br/portal/solicitar-proposta.html"
                },
                {
                    producao   : "https://rh.multibeneficiosgpa.com.br/portal/index.html",
                    homologacao: "https://rhhmp.multibeneficiosgpa.com.br/portal/index.html"
                },
                {
                    producao   : "https://consolidador.multibeneficiosgpa.com.br/portal/login/beneficiario.html",
                    homologacao: "https://consolidadorhmp.multibeneficiosgpa.com.br/portal/login/beneficiario.html"
                },
                {
                    producao   : "https://consolidador.multibeneficiosgpa.com.br/portal/quero-me-cadastrar/beneficiario.html",
                    homologacao: "https://consolidadorhmp.multibeneficiosgpa.com.br/portal/quero-me-cadastrar/beneficiario.html"
                },
                {
                    producao   : "https://consolidador.multibeneficiosgpa.com.br/portal/fale-conosco/fale-conosco-multibeneficios.html",
                    homologacao: "https://consolidadorhmp.multibeneficiosgpa.com.br/portal/fale-conosco/fale-conosco-multibeneficios.html"
                }
            ];

            for( var i = 0; i < urls.length; i++ ) {
                $( 'a[href="' + urls[i].producao + '"]' ).attr( 'href', urls[i].homologacao );
            }
        }



        // Polyfill input placeholder
        if( !Modernizr.input.placeholder && typeof( jQuery().placeholder ) !== 'undefined' ){
            $('input, textarea').placeholder();
        }



        // Dispara o evento de Scroll para garantir que o menu estará com o estilo correto: Full ou Reduzido
        gpaMulti.isMenuReduzido = false;
        $window.triggerHandler( 'scroll' );



        // Inicializa validação dos formulários
        $( '.js--validate' ).trigger( 'validate.init' );
        $( '.js--mask-telefone' ).trigger( 'mask.telefone' );
        $( '.js--mask-cnpj' ).trigger( 'mask.cnpj' );
        $( '.js--mask-cpf' ).trigger( 'mask.cpf' );
        $( '.js--mask-cep' ).trigger( 'mask.cep' );
        $( '.js--mask-numeros' ).trigger( 'mask.numeros' );
        $( '.js--mask-valores' ).trigger( 'mask.valores' );
        $( '.js--mask-data' ).trigger( 'mask.data' );
        $( '.js--mask-numCartao' ).trigger( 'mask.numCartao' );



        // Inicializa FAQ
        $( '.js--faq' ).each( function() {
            faqInit( $( this ) );
        });



        // Inicializa Slider Cartões - Produtos
        $( '.js--slider-cartoes' ).each( function() {
            $(this).bxSlider({
                minSlides       : 1,
                maxSlides       : 5,
                slideWidth      : 260,
                slideMargin     : 30,
                moveSlides      : 1,
                pager           : false,
                infiniteLoop    : false,
                hideControlOnEnd: true,
                nextSelector    : '.slider-cartoes--next',
                prevSelector    : '.slider-cartoes--prev',
            });
        });



        // Inicializa Slider Cartões Cash
        $( '.js--cash-cartoes-slider' ).each( function() {
            $(this).bxSlider({
                pager         : false,
                nextSelector  : '.produto-cash__cartoes--next',
                prevSelector  : '.produto-cash__cartoes--prev',
                adaptiveHeight: true
            });
        });



        // Inicia galeria bx Slider
        $('.bxslider').bxSlider({
          pagerCustom: '.nav-thumb'
        });

            var realSlider= $("ul#bxslider").bxSlider({
                speed:2000,
                pager:false,
                nextText:'',
                prevText:'',
                infiniteLoop:false,
                hideControlOnEnd:true,
                onSlideBefore:function($slideElement, oldIndex, newIndex){
                    changeRealThumb(realThumbSlider,newIndex);
                }
            });

            var realThumbSlider=$("ul#bxslider-pager").bxSlider({
                minSlides: 5,
                maxSlides: 5,
                slideWidth: 269,
                slideMargin: 35,
                moveSlides: 2,
                pager:false,
                speed:500,
                infiniteLoop:true,
                hideControlOnEnd:true,
                nextText:'<span></span>',
                prevText:'<span></span>'
            });

            linkRealSliders(realSlider,realThumbSlider);

            if($("#bxslider-pager li").length<5){
                $("#bxslider-pager .bx-next").hide();
            }


            $('.cartoes .slider-cartao .bx-prev').attr('data-ga-action', '').attr('data-ga', 2);
            $('.cartoes .slider-cartao .bx-next').attr('data-ga-action', '').attr('data-ga', 2);
    });



    /*
        Página completamente carregada
    */
    $window.on( 'load', function() {

        // Carregamento de Estados e Cidades
        var $cidadesInput = $( '#cidade' ),
            $estadosInput = $( '#uf' );

        if( $cidadesInput.length > 0 && $estadosInput.length > 0 ) {
            new dgCidadesEstados({
                cidade: $cidadesInput.get( 0 ),
                estado: $estadosInput.get( 0 )
            });
        }


        // Padronizar altura do elementos 'Para você'
        var $paraVoceColaborador = $( '.para-voce--colaborador' ),
            $paraVoceEmpresa     = $( '.para-voce--empresa' );

        if( $paraVoceColaborador.length > 0 ) {
            padronizarAltura( $paraVoceColaborador.find( '.para-voce__item' ) );
        }

        if( $paraVoceEmpresa.length > 0 ) {
            padronizarAltura( $paraVoceEmpresa.find( '.para-voce__item' ) );
        }


        // Padronizar altura do banners de cartão Multicash
        var $cartoesCash = $( '.produto-cash__cartoes__cartao__limite' );

        if( $cartoesCash.length > 0 ) {
            padronizarAltura( $cartoesCash );
        }
    });



    /*
        Resize da tela
    */
    $window.on( 'resize', function() {

        // Fecha o menu caso esteja aberto no mobile
        toggleMenu( false );

        // Recalcula FAQ
        $( '.js--faq' ).each( function() {
            faqInit( $( this ) );
        });



        // Padronizar altura do elementos 'Para você'
        var $paraVoceColaborador = $( '.para-voce--colaborador' ),
            $paraVoceEmpresa     = $( '.para-voce--empresa' );

        if( $paraVoceColaborador.length > 0 ) {
            padronizarAltura( $paraVoceColaborador.find( '.para-voce__item' ) );
        }

        if( $paraVoceEmpresa.length > 0 ) {
            padronizarAltura( $paraVoceEmpresa.find( '.para-voce__item' ) );
        }



        // Padronizar altura do banners de cartão Multicash
        var $cartoesCash = $( '.produto-cash__cartoes__cartao__limite' );

        if( $cartoesCash.length > 0 ) {
            padronizarAltura( $cartoesCash );
        }
    });



    /*
        Scroll da tela
    */
    $window.on( 'scroll', function() {

        var scrollTop = $window.scrollTop();

        // Fixa Scroll
        if( scrollTop >= 60 && !gpaMulti.isMenuReduzido ) {
            $body.addClass( 'reduzir-menu' );
            gpaMulti.isMenuReduzido = true;
        } else if( scrollTop < 60 && gpaMulti.isMenuReduzido ) {
            $body.removeClass( 'reduzir-menu' );
            gpaMulti.isMenuReduzido = false;
        }
    });



    /*
        Retorno para teclas precionadas
    */
    $document.on( 'keydown', function(e) {
        var tecla = e.keyCode || e.which;

        // ESC
        if( tecla === 27 ) {
            // Fechar busca, caso esteja aberta
            if( $( '.mostrar-busca' ).length > 0 ) {
                toggleFormularioBusca( false );
            }
        }
    });



    /*
        Retorno para click no documento
    */
    $document.on( 'click', function(e) {
        var $target = $( e.target );

        // O clique foi fora do formulário de busca?
        if( !$target.hasClass( 'form__input--busca' ) && !$target.hasClass( '.navegacao__busca--abrir' ) ) {
            // Fechar busca, caso esteja aberta
            if( $( '.mostrar-busca' ).length > 0 ) {
                toggleFormularioBusca( false );
            }
        }
    });



    /*
        Scroll animado para qualquer elemento da tela
    */
    $document.on( 'click', '.js--scroll-to', function(e) {
        e.preventDefault();
        scrollTo( $( $( this ).attr( 'data-seletor' ) ) );
    });



    /*
        Abrir o formulário de busca
    */
    $document.on( 'click', '.js--abrir-busca', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleFormularioBusca( true );
    });



    /*
        Abrir menu no mobile
    */
    $document.on( 'click', '.js--abrir-menu', function(e) {
        e.preventDefault();
        toggleMenu( !$('.navegacao__menu').hasClass( 'mostrar-menu' ) );
    });



    /*
        Inicializa validate nos forms
    */
    $document.on( 'validate.init', '.js--validate', function( e ) {

        if( typeof( $().validate ) === 'undefined' ) {
            return false;
        }

        var $this      = $( this ),
            $validator = $this.validate({

                // Mensagens customizadas para os erros
                messages: {
                    NomeEmpresa: "Por favor, informe o nome da empresa.",
                    cnpj: {
                        required: "Por favor, informe o nº do CNPJ da empresa.",
                        CNPJ: "Por favor, informe um CNPJ válido."
                    },
                    identificadorFiscal: {
                        required: "Por favor, informe o nº do seu CPF.",
                        identificadorFiscal: "Por favor, informe um CPF válido."
                    },
                    cpf: {
                        required: "Por favor, informe o nº do seu CPF.",
                        cpf: "Por favor, informe um CPF válido."
                    },
                    parametroLogin: {
                        required: "Por favor, informe o nº do seu CPF.",
                        parametroLogin: "Por favor, informe um CPF válido."
                    },
                    cep: "Por favor, informe o seu CEP.",
                    estado : "Por favor, selecione um estado.",
                    uf : "Por favor, selecione um estado.",
                    cidade : "Por favor, selecione uma cidade.",
                    nameContato : "Por favor, informe o seu nome.",
                    nome : "Por favor, informe o seu nome.",
                    login: {
                        required: "Por favor, informe o seu email.",
                        email: "Por favor, informe um email válido."
                    },
                    email: {
                        required: "Por favor, informe o seu email.",
                        email: "Por favor, informe um email válido."
                    },
                    confirmacaoEmail: {
                        required: "Por favor, informe o seu email.",
                        email: "Por favor, informe um email válido.",
                        equalTo: "Por favor, verifique se o email foi digitado corretamente."
                    },
                    confirmEmail: {
                        required: "Por favor, informe o seu email.",
                        email: "Por favor, informe um email válido.",
                        equalTo: "Por favor, verifique se o email foi digitado corretamente."
                    },
                    telefoneResidencial: {
                        required: "Por favor, informe o seu telefone."
                    },
                    telefone: {
                        required: "Por favor, informe o seu telefone."
                    },
                    celular: {
                        required: "Por favor, informe o seu telefone celular."
                    },
                    tipo_msg: "Por favor, selecione o tipo da mensagem.",
                    assunto: "Por favor, informe um assunto.",
                    name: "Por favor, informe o seu nome.",
                    RazaoSocial: "Por favor, informe a razão social da empresa.",
                    senha: "Por favor, informe a sua senha.",
                    confirmacaoSenha: {
                        required: "Por favor, informe a sua senha.",
                        equalTo: "Por favor, verifique se a senha foi digitada corretamente."
                    },
                    password: "Por favor, informe a sua senha.",
                    newPassword: "Por favor, informe a sua senha.",
                    confirmPassword: {
                        required: "Por favor, informe a sua senha.",
                        equalTo: "Por favor, verifique se a senha foi digitada corretamente."
                    },
                    message: "Por favor, informe uma mensagem.",
                    dataNascimento: "Por favor, informe a data de nascimento.",
                    numCartao: "Por favor, informe a o nº do cartão.",
                    j_captcha_response: "Por favor, verifique se o código foi digitado corretamente.",
                    nameEmpresa: "Por favor, informe o nome da empresa.",
                    cargo: "Por favor, informe o seu cargo.",
                    departamento: "Por favor, informe o seu departamento.",
                    sexo: "Por favor, informe seu sexo.",
                    type_user_valor: "Por favor, informe uma valor válido.",


                    qtdeFuncMultiAlimentacao: "Por favor, informe o número de funcinários.",
                    valorBenMultiAlimentacaoMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncMultiAlimentacaoCestaBasica: "Por favor, informe o número de funcinários.",
                    valorBenMultiAlimentacaoCestaBasicaMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncCartaoDaMamae: "Por favor, informe o número de funcinários.",
                    valorBenCartaoDaMamaeMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncMultiCash: "Por favor, informe o número de funcinários.",
                    valorBenMultiCashMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncMultiCashEletro: "Por favor, informe o número de funcinários.",
                    valorBenMultiCashEletroMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncMultiCashBrinquedo: "Por favor, informe o número de funcinários.",
                    valorBenMultiCashBrinquedoMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncMultiCashCheque: "Por favor, informe o número de funcinários.",
                    valorBenMultiCashChequeMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncMultiCashEmpresarial: "Por favor, informe o número de funcinários.",
                    valorBenMultiCashEmpresarialMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncMultiCashCombustivel: "Por favor, informe o número de funcinários.",
                    valorBenMultiCashCombustivelMes: "Por favor, informe o valor do benefício.",

                    qtdeFuncMultiCashNatal: "Por favor, informe o número de funcinários.",
                    valorBenMultiCashNatalMes: "Por favor, informe o valor do benefício.",

                    'endereco.cep': "Por favor, informe o seu CEP.",
                    'endereco.logradouro': "Por favor, informe o seu endereço.",
                    'endereco.numero': "Por favor, informe o número do seu endereço.",
                    'endereco.bairro': "Por favor, informe o seu bairro.",
                    'endereco.cidade': "Por favor, informe a sua cidade.",
                    'endereco.estado': "Por favor, informe o seu estado.",
                },

                // Regras específicas para validação
                rules: {
                    confirmacaoEmail: {
                        equalTo: '#email'
                    },
                    confirmEmail: {
                        equalTo: '#email'
                    },
                    confirmPassword: {
                        equalTo: '#newPassword'
                    },
                    confirmacaoSenha: {
                        equalTo: '#senha'
                    }
                }

            });

        // Reset de validação
        $this.on( 'reset', function() {
            $validator.resetForm();
        });
    });



    /*
        Inicializa máscara para input de telefone
    */
    $document.on( 'mask.telefone', '.js--mask-telefone', function() {
        if( typeof( $().mask ) === 'undefined' ) {
            return false;
        }

        var opcoesTelefone = {
            onKeyPress: function( telefone, e, campo, opcoes ) {
                var masksTelefone = [ '(00) 00000-0000', '(00) 0000-00000' ],
                    maskTelefone  = ( telefone.length > 14 )? masksTelefone[0] : masksTelefone[1];

                $( campo ).mask( maskTelefone, opcoes );
            }
        };

        $( this ).mask( '(00) 0000-00000', opcoesTelefone );
    });



    /*
        Inicializa máscara para input de CNPJ
    */
    $document.on( 'mask.cnpj', '.js--mask-cnpj', function() {
        if( typeof( $().mask ) === 'undefined' ) {
            return false;
        }

        $( this ).mask( '00.000.000/0000-00' );
    });



    /*
        Inicializa máscara para input de CPF
    */
    $document.on( 'mask.cpf', '.js--mask-cpf', function() {
        if( typeof( $().mask ) === 'undefined' ) {
            return false;
        }

        $( this ).mask( '000.000.000-00' );
    });



    /*
        Inicializa máscara para input de CEP
    */
    $document.on( 'mask.cep', '.js--mask-cep', function() {
        if( typeof( $().mask ) === 'undefined' ) {
            return false;
        }

        $( this ).mask( '00000-000' );
    });



    /*
        Inicializa máscara para input de Nº de Funcionários
    */
    $document.on( 'mask.numeros', '.js--mask-numeros', function() {
        if( typeof( $().mask ) === 'undefined' ) {
            return false;
        }

        $( this ).mask( '00000' );
    });



    /*
        Inicializa máscara para input de valor
    */
    $document.on( 'mask.valores', '.js--mask-valores', function() {
        if( typeof( $().mask ) === 'undefined' ) {
            return false;
        }

        $( this ).mask( 'R$ 000.000,00', {reverse: true} );
    });



    /*
        Inicializa máscara para input de data
    */
    $document.on( 'mask.data', '.js--mask-data', function() {
        if( typeof( $().mask ) === 'undefined' ) {
            return false;
        }

        $( this ).mask('00/00/0000', {'translation': {0: {pattern: /[0-9*]/}}});
    });



    /*
        Inicializa máscara para input de número do cartão
    */
    $document.on( 'mask.numCartao', '.js--mask-numCartao', function() {
        if( typeof( $().mask ) === 'undefined' ) {
            return false;
        }

        $( this ).mask( '0000 0000 0000 0000' );
    });



    /*
        Habilita input de Informações do Beneficiário no formulário da página Solicite uma Proposta
    */
    $document.on( 'click', '.js--habilita-input', function() {
        var $this      = $(this),
            $formInput = $this.parents('.form__bloco').find( '.form__input--info' );

        if( $this.is(':checked') ){
            $formInput.addClass('required').removeAttr('disabled');
        } else {
            $formInput.removeClass('required').attr('disabled', 'disabled');
        }
    });



    /*
        Habilita fieldsets das opções SIM e NÃO na página Alterar Login passo 2
    */
    $document.on( 'click', '.js--habilita-radio', function() {
        if( $(this).hasClass('opcao-sim') ){
            $( '.form__fieldset').removeClass('ativo');
            $( '.form__fieldset--opcao--sim').addClass('ativo');
        } else{
            $( '.form__fieldset').removeClass('ativo');
            $( '.form__fieldset--opcao--nao').addClass('ativo');
        }
    });



    /*
        Altera input do tipo CNPJ para CPF na página Fale Conosco de Beneficiário
    */
    $document.on( 'click', '.js--habilita-radio', function() {

        var $tipoUsuario = $('.js--input-tipo-usuario');

        if( $(this).attr('data-tipo') == 'cnpj' ){

            $tipoUsuario
                .removeClass('js--mask-cpf')
                .addClass('js--mask-cnpj')
                .val('')
                .unmask()
                .trigger('mask.cnpj')
                .attr({
                    'placeholder': '*CNPJ (00.000.000/0000-00)'
                });
        } else{
            $tipoUsuario
                .removeClass('js--mask-cnpj')
                .addClass('js--mask-cpf')
                .val('')
                .unmask()
                .trigger('mask.cpf')
                .attr({
                    'placeholder': '*CPF (000.000.000-00)'
                });
        }
    });



    /*
        Mostra paineis de dados do mapa institucional
    */
    $document
        .on( 'mouseenter', '.js--mapa-regiao', function() {
            var regiao  = $( this ).attr( 'data-regiao' ),
                $painel = $( '.institucional-lojas__mapa__painel-regiao[data-regiao="' + regiao + '"]' );

            $painel.addClass( 'mostrar' );
        })
        .on( 'mouseleave', '.js--mapa-regiao', function() {
            var regiao  = $( this ).attr( 'data-regiao' ),
                $painel = $( '.institucional-lojas__mapa__painel-regiao[data-regiao="' + regiao + '"]' );

            $painel.removeClass( 'mostrar' );
        });




})(jQuery);

