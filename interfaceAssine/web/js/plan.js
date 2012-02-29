function Plan(options) {
    var defaults = {
        'initialPrice': 199.90,
        'displayName': '',
        'tooltip': '',
        'advice': '579',
        'id': ''
    };

    this.options = $.extend(defaults, options);
}

Plan.prototype = {
    'options':{},

    getInitialPrice: function() {
        return this.options.initialPrice;
    },

    getDisplayName: function() {
        return this.options.displayName;
    },

    getTooltip: function() {
        return this.options.tooltip;
    },

    getAdvice: function() {
        return this.options.advice;
    },

    getId: function() {
        return this.options.id;
    }
};