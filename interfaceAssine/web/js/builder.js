var Builder = {	    	
    'plans': {},
	'parent': null,
	'elements': {},
	'defaultElement': null,
	'totals' : {},
	'debug': false,
	'css':{
		'title': '.boxTitle',
		'advice': '.advice',
		'initial': '.initialValue',
		'siteValue': '.siteValue',
		'defaultService': '#defaultService',
		'services': '.services'		
	},
	
    build: function () {
				   
		Builder.log("starting to create the plans");		
		Builder.createPlans(Builder.plans)
		Builder.log("plan´s creation finished !");
		
		Builder.log("starting to create the elements");
		//Builder.createElements();
		Builder.log("finished to create the elements");
		
		Builder.log("calculation starting...");
		Builder.startCalculation();
		Builder.log("calculation started");
    },
	
	createPlans: function(plans) {
		var planDiv;
		$.each(plans, function(key, plan) {
			Builder.log("starting creating " + plan.getDisplayName() + "plan");
			planDiv = Builder.createPlan(key, plan);
			planDiv = Builder.createCheckBox(planDiv, Builder.elements);
			
			Builder.log("appending plan : " + plan.getDisplayName());
			$(planDiv).appendTo(Builder.defaultElement.parent());
			
			Builder.log("finished creating " + plan.getDisplayName() + "plan");
		});
	},
	
	startCalculation: function() {		
		$("input.services").change(Builder.updatePrice);		
	},
	
	updatePrice: function() {
		$(".contentBox").each(function() {
			var totalValue = $(this).find("input[name=totalValue]");
			var initialValue = $(this).find("input[name=initialValue]");

			totalValue.val(initialValue.val());
			
			$(this).find(".boxServices .services:checked").each(function() {
				totalValue.val(parseFloat(totalValue.val()) + parseFloat($(this).attr("alt")));
			});
			
			$(this).find("span.siteValue").each(function() {
				$(this).html(Builder.moneyFormat(totalValue.val()));
				
				if (parseFloat(totalValue.val()) > parseFloat(initialValue.val())) {
					$(this).addClass("selected");
				} else {
					$(this).removeClass("selected");
				}
			});
		});   
	},
	
	get: function(key) {	
		return Builder.css[key];
	},
	
	createCheckBox: function(plan, elements) {
		var clone;
		
		Builder.log("creating checkboxs");
		$.each(elements, function(key, element) { 
			clone = plan.find(Builder.get("defaultService")).clone();
			
			//Removing the class so he can reappear
			clone.attr("id","");
		
			Builder.log("creating checkbox : " + element.getDisplayName() + " and changing the value to : " + element.getPrice());
			clone.find("input[type=checkbox]").attr("alt",element.getPrice());			
			Builder.log("checkbox " + element.getDisplayName() + " created !");
			
			clone.appendTo(plan.find(Builder.get("defaultService")).parent());
		});
		Builder.log("checkboxs created !");
		
		return plan;
	},
	
	createPlan: function(key, plan) {
		var clone = Builder.defaultElement.clone();				
		Builder.log("creating plan's div : " + plan.getDisplayName());

		//Changing the id
		clone.attr("id", plan.getId());
		
		//Setting the new values of fields
		Builder.setValue(clone.find(Builder.get("title")), plan.getDisplayName());
		Builder.setValue(clone.find(Builder.get("advice")), plan.getAdvice());
		Builder.setValue(clone.find(Builder.get("initial")), plan.getInitialPrice());
		Builder.setValue(clone.find(Builder.get("siteValue")), Builder.moneyFormat(plan.getInitialPrice()));
		
		Builder.log("plan's div created !");
		
		return clone;
	},
	
	moneyFormat: function(n_value) {

		// save the sign
		var b_negative = Boolean(n_value < 0);

		n_value = Math.abs(n_value);

		// round to 1/100 precision, add ending zeroes if needed
		var s_result = String(Math.round(n_value * 1e2) % 1e2 + '00').substring(0, 2);
		
		// separate all orders
		var b_first = true;
		var s_subresult;

		while (n_value >= 1) {
			s_subresult = (n_value >= 1e3 ? '00' : '') + Math.floor(n_value % 1e3);
			s_result = s_subresult.slice(-3) + (b_first ? ',' : '.') +  s_result;
			b_first = false;
			n_value = n_value / 1e3;
		}

		// add at least one integer digit

		if (b_first) {
			s_result = '0.' +  s_result;
		}

		// apply formatting and return

		return b_negative ? '(R$ ' + s_result + ')' : 'R$ ' + s_result;
	},
	
	setValue: function(element, data) {
		var tagName = element.get(0).tagName;
		if (tagName in { 'INPUT':1,  }) {
			element.val(data);
		} else {
			element.html(data);
		}
	},

	log: function(obj, iterate) {
		if (Builder.debug) {
			if (iterate) {
				console.log("[Debug] Iterating object");
				for (var i in obj) {
					console.log("[Debug] " + i + " = " + obj[i]);
				}
				console.log("[Debug] End interation");
			} else {
				console.log("[Debug] " + obj);
			}
		}
	}
}

