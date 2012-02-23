function Element(options) {
    var defaults = {
		'pricingGroup': 'A',
		'displayName': '',
		'tooltip': '',
		'pricing':{
			'A' : 19.90,
			'B' : 29.90,
			'C' : 39.90
		}
	};

	this.options = $.extend(defaults, options);
};

Element.prototype = {
	'options': {},
    
	getPrice: function() {
		return this.options.pricing[this.options.pricingGroup];
	},
	
	getDisplayName: function() {
		return this.options.displayName;
	},
	
	getTooltip: function() {
		return this.options.tooltip;
	}
};