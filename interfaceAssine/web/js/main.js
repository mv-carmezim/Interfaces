/**
*
* Falta criar os elementos da esquerda, criar os botoes juntos com os plans e tooltips ( =/ )
*
*/
var elements = {
	'integracaoRedes' : new Element({ 
		'pricingGroup': 'A', 
		'displayName': 'Integração com redes', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'facebook' : new Element({ 
		'pricingGroup': 'A', 
		'displayName': 'Facebook', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'twitter' : new Element({ 
		'pricingGroup': 'A', 
		'displayName': 'Twitter', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'orkut' : new Element({ 
		'pricingGroup': 'A', 
		'displayName': 'Orkut', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'youtube' : new Element({ 
		'pricingGroup': 'B', 
		'displayName': 'Youtube', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'gmaps' : new Element({
		'pricingGroup': 'B', 
		'displayName': 'Google Maps', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'flickr' : new Element({
		'pricingGroup': 'B', 
		'displayName': 'Flickr', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'foursquare' : new Element({
		'pricingGroup': 'B', 
		'displayName': 'Foursquare', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'seo' : new Element({
		'pricingGroup': 'C', 
		'displayName': 'SEO', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'estatisticaBasica' : new Element({
		'pricingGroup': 'C', 
		'displayName': 'Estatísticas Básicas', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'pesquisaMarketing' : new Element({
		'pricingGroup': 'C', 
		'displayName': 'Pesquisa de Marketing', 
		'tooltip':'Tooltip qualquer'
	}),
	
	'facebookAvancado' : new Element({
		'pricingGroup': 'C', 
		'displayName': 'Facebook Avançado', 
		'tooltip':'Tooltip qualquer'
	})
};

var plans = {
	'cartaoWeb' : new Plan({
		'initialPrice':199.90,
		'displayName': 'Cartão Web', 
		'tooltip':'Outra Tooltip',
		'advice':'579',
		'id':'contentCard' 
	}),
	
	'webMais' : new Plan({
		'initialPrice':299.90,
		'displayName': 'Web Mais', 
		'tooltip':'Outra Tooltip',
		'advice':'579',
		'id':'contentPlus'
	}),
	
	'webPremium' : new Plan({
		'initialPrice':399.90,
		'displayName': 'Web Premium', 
		'tooltip':'Outra Tooltip',
		'advice':'579',
		'id':'contentPremium'
	})
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
    		this.getTip().animate({top: '+=15'}, 500, 'bouncy', done).show();
    	},

	    function(done) {
    		this.getTip().hide();
    		done.call();
    	}
    );
	
    //Iniciando as tooltips
    $(tooltipHandler + "[title]").tooltip({"effect": "bouncy"});            
}

