;(function (define) {

define(['jquery', 'backbone'], function ($, Backbone) {
   'use strict';

    return Backbone.View.extend({

        el: '',
        events: {
            'click .offer-claim-button': 'claimOffer',
        },

        initialize: function () {
            console.log("offer sidebar initialize");
            this.$claimButton = this.$el.find('.offer-claim-button');
            this.$offerTokenField = this.$el.find('.offer-token-field');
            this.setInitialStyle();
        },

        claimOffer: function () {
            console.log("offer sidebar claimOffer");
            $.ajax({
                url: '/claim_ibm_cloud_token',
                type: 'GET',
                headers: {'X-CSRFToken': $.cookie('csrftoken')},                
                notifyOnError: false,
                success: function(json) {
                    console.log(json);
                    // var token = JSON.stringify(json);
                    this.$offerTokenField.text(json);
                    this.setActiveStyle();
                    this.trigger('claim');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(jqXHR.responseText);
                }
            });
        },

        setActiveStyle: function () {
            console.log("offer sidebar setActiveStyle");
            this.$claimButton.hide();
            this.$offerTokenField.show();
        },

        setInitialStyle: function () {
            console.log("offer sidebar setInitialStyle");
            this.$claimButton.show();
            this.$offerTokenField.hide();
        }

    });

});

})(define || RequireJS.define);
