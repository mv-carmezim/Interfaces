var Builder = {
    'plans': {},
    'elements': {},
    'totals' : {},
    'debug': false,
    'css':{
        'title': '.boxTitle',
        'id': '.id',
        'advice': '.advice',
        'initial': '.initialValue',
        'siteValue': '.siteValue',
        'defaultService': '#defaultService',
        'services': '.services',
        'defaultElement': '#defaultElement',
        'defaultContent': '#defaultContent',
        'serviceName': '.serviceName',
        'tooltip': '.showBaloon',
        'clearButton': '.clearButton',
        'contentBox': '.contentBox'
    },

    build: function () {
        Builder.log("starting to create the plans");
        Builder.createPlans(Builder.plans)
        Builder.log("plans creation finished !");

        Builder.log("starting to create the elements");
        Builder.createElements(Builder.elements);
        Builder.log("finished to create the elements");

        Builder.log("Listeners starting...");
        Builder.startListeners();
        Builder.log("Listeners started");
    },

    createElements: function(plans) {
        var elementDiv;
        $.each(plans, function(key, plan) {
            Builder.log("creating element :" + plan.getDisplayName());

            elementDiv = Builder.createElement(key, plan);

            Builder.log("appending element : " + plan.getDisplayName());
            $(elementDiv).appendTo($(Builder.get("defaultElement")).parent());

            Builder.log("finished creating element :" + plan.getDisplayName());
        });
    },

    createElement: function(key, plan) {
        var clone = $(Builder.get("defaultElement")).clone();
        Builder.log("creating element's li : " + plan.getDisplayName());

        //Changing the id
        clone.attr("id", "");

        //Setting the new values of fields
        Builder.setValue(clone.find(Builder.get("serviceName")), plan.getDisplayName());
        clone.find(Builder.get("tooltip")).attr("title",plan.getTooltip());

        Builder.log("elements's li created !");

        return clone;
    },

    createPlans: function(plans) {
        var planDiv;
        $.each(plans, function(key, plan) {
            Builder.log("starting creating " + plan.getDisplayName() + "plan");
            planDiv = Builder.createPlan(key, plan);
            planDiv = Builder.createCheckBox(planDiv, Builder.elements);

            Builder.log("appending plan : " + plan.getDisplayName());
            $(planDiv).appendTo($(Builder.get("defaultContent")).parent());

            Builder.log("finished creating " + plan.getDisplayName() + "plan");
        });
    },

    startListeners: function() {
        $(Builder.get("services")).change(Builder.updatePrice);
        $(Builder.get("clearButton")).click(Builder.cleanBoxes);
    },


    cleanBoxes: function() {
        $("input[type=checkbox]:checked").attr("checked",false);
        Builder.updatePrice();
    },

    updatePrice: function() {
        var selectedID = $(this).parents(Builder.get("contentBox")).find(Builder.get("id")).val();
        $(".contentBox").each(function() {
            var totalValue = $(this).find("input[name=totalValue]");
            var initialValue = $(this).find("input[name=initialValue]");

            totalValue.val(initialValue.val());

            $(this).find(Builder.get("services") + ":checked").each(function() {
                totalValue.val(parseFloat(totalValue.val()) + parseFloat($(this).val()));
            });


            var siteValues = $(this).find(Builder.get("siteValue"));
            siteValues.removeClass("selected");
            siteValues.each(function() {
                $(this).html(Builder.moneyFormat(totalValue.val()));

                
                if ($(this).parents(Builder.get("contentBox")).find(Builder.get("id")).val() == selectedID) {
                    if (parseFloat(totalValue.val()) > parseFloat(initialValue.val())) {
                        $(this).addClass("selected");
                    } else {
                        $(this).removeClass("selected");
                    }
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
            clone.find("input[type=checkbox]").val(element.getPrice());
            Builder.log("checkbox " + element.getDisplayName() + " created !");

            clone.appendTo(plan.find(Builder.get("defaultService")).parent());
        });
        Builder.log("checkboxs created !");

        return plan;
    },

    createPlan: function(key, plan) {
        var clone = $(Builder.get("defaultContent")).clone();
        Builder.log("creating plan's div : " + plan.getDisplayName());

        //Changing the id
        clone.attr("id", plan.getId());

        //Setting the new values of fields
        Builder.setValue(clone.find(Builder.get("id")), plan.getId());
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
        if (tagName in {
            'INPUT':1
        }) {
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

