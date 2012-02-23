$(function() {
	// create custom animation algorithm for jQuery called "bouncy"
$.easing.bouncy = function (x, t, b, c, d) {
    var s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
}

// create custom tooltip effect for jQuery Tooltip
$.tools.tooltip.addEffect("bouncy",

	// opening animation
	function(done) {
		this.getTip().animate({top: '+=15'}, 500, 'bouncy', done).show();
	},

	// closing animation
	function(done) {
		this.getTip().hide();
		done.call();
	}
);
	
    //Iniciando as tooltips
    $("img.showBaloon[title]").tooltip({"effect": "bouncy"});
         
    cleanBoxes();
    updatePrice();
    
    $("input.services").change(updatePrice); 
});

function cleanBoxes() {
    $(".boxServices input[type=checkbox]:checked").attr("checked",false);
}

function updatePrice() {
    $(".contentBox").each(function() {
        var totalValue = $(this).find("input[name=totalValue]");
        var initialValue = $(this).find("input[name=initialValue]");

        totalValue.val(initialValue.val());
        
        $(this).find(".boxServices .services:checked").each(function() {
            totalValue.val(parseFloat(totalValue.val()) + parseFloat($(this).attr("alt")));
        });
        
        $(this).find("span.siteValue").each(function() {
            $(this).html("R$ " + (totalValue.val() + "").replace(".",","));
            
            if (parseFloat(totalValue.val()) > parseFloat(initialValue.val())) {
                $(this).addClass("selected");
            } else {
                $(this).removeClass("selected");
            }
        });
    });
    
}