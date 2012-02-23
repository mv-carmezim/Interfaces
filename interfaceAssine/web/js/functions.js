$(function() {
    //Iniciando as tooltips
    //$("img[title]").tooltip();
         
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