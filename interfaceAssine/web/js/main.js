/**
 *
 * Falta criar os botoes juntos com os plans
 *
 */
var elements = {
    'integracaoRedes' : new Element({
        'pricingGroup': 'A',
        'displayName': 'Integra&ccedil;&atilde;o com redes',
        'name': 'integracaoRedes',
        'tooltip': 'Tooltip qualquer'
    }),

    'facebook' : new Element({
        'pricingGroup': 'A',
        'displayName': 'Facebook',
        'name': 'facebook',
        'tooltip': 'Tooltip qualquer'
    }),

    'twitter' : new Element({
        'pricingGroup': 'A',
        'displayName': 'Twitter',
        'name': 'twitter',
        'tooltip': 'Tooltip qualquer'
    }),

    'orkut' : new Element({
        'pricingGroup': 'A',
        'displayName': 'Orkut',
        'name': 'orkut',
        'tooltip': 'Tooltip qualquer'
    }),

    'youtube' : new Element({
        'pricingGroup': 'B',
        'displayName': 'Youtube',
        'name': 'youtube',
        'tooltip': 'Tooltip qualquer'
    }),

    'gmaps' : new Element({
        'pricingGroup': 'B',
        'displayName': 'Google Maps',
        'name': 'gmaps',
        'tooltip': 'Tooltip qualquer'
    }),

    'flickr' : new Element({
        'pricingGroup': 'B',
        'displayName': 'Flickr',
        'name': 'flickr',
        'tooltip': 'Tooltip qualquer'
    }),

    'foursquare' : new Element({
        'pricingGroup': 'B',
        'displayName': 'Foursquare',
        'name': 'foursquare',
        'tooltip': 'Tooltip qualquer'
    }),

    'seo' : new Element({
        'pricingGroup': 'C',
        'displayName': 'SEO',
        'name': 'seo',
        'tooltip': 'Tooltip qualquer'
    }),

    'estatisticaBasica' : new Element({
        'pricingGroup': 'C',
        'displayName': 'Estatísticas Básicas',
        'name': 'estatisticaBasica',
        'tooltip': 'Tooltip qualquer'
    }),

    'pesquisaMarketing' : new Element({
        'pricingGroup': 'C',
        'displayName': 'Pesquisa de Marketing',
        'name': 'pesquisaMarketing',
        'tooltip': 'Tooltip qualquer'
    }),

    'facebookAvancado' : new Element({
        'pricingGroup': 'C',
        'displayName': 'Facebook Avançado',
        'name': 'facebookAvancado',
        'tooltip': 'Tooltip qualquer'
    })

//To add a new element (do not forget the comma)
//'anyKey' : new Element({
//	'pricingGroup': 'A|B|C',
//	'displayName': 'The name that will be displayed',
//	'tooltip':'The tooltip text'
//})
};

var plans = {
    'cartaoWeb' : new Plan({
        'initialPrice': 199.90,
        'displayName': 'Cartão Web',
        'tooltip': 'Outra Tooltip',
        'advice': '',
        'id': 'contentCard'
    }),

    'webMais' : new Plan({
        'initialPrice': 299.90,
        'displayName': 'Web Mais',
        'tooltip': 'Outra Tooltip',
        'advice': '',
        'id': 'contentPlus'
    }),

    'webPremium' : new Plan({
        'initialPrice': 399.90,
        'displayName': 'Web Premium',
        'tooltip': 'Outra Tooltip',
        'advice': '',
        'id': 'contentPremium'
    })

//To add a new Plan (do not forget the comma)
//'anyKey' : new Plan({
//	'initialPrice': 199.90, //price as double
//	'displayName': 'the name that will be displayed',
//	'tooltip': 'the tooltip text',
//	'advice': '579', //number of recommendations as string
//	'id': 'idOfThePlan'
//})
};

$(function() {
    Builder.elements = elements;
    Builder.plans = plans;

    // Turn Debug on only under development mode
    //Builder.debug = true;

    Builder.build();

    toolTipDarkMagic("img.showBaloon");
});

// Used to start tooltip and create the bouncy effect
function toolTipDarkMagic(tooltipHandler) {
    $.easing.bouncy = function (x, t, b, c, d) {
        var s = 1.70158;
        if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    }

    $.tools.tooltip.addEffect("bouncy",
        function(done) {
            this.getTip().animate({
                top: '+=15'
            }, 500, 'bouncy', done).show();
        },

        function(done) {
            this.getTip().hide();
            done.call();
        }
        );

    //Iniciando as tooltips
    $(tooltipHandler + "[title]").tooltip({
        "effect": "bouncy"
    });
}

