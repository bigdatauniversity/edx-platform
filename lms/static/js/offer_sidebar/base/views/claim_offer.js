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
            console.log("offer sidebar clainOffer");
            $.ajax({
                url: '/claim_ibm_cloud_token',
                type: 'POST',
                dataType: 'json',
                notifyOnError: false,
                data: {'username': 'jixu204'},
                success: function(json) {
                    var token = JSON.stringify(json);
                    this.$offerTokenField.text(token);
                    this.setActiveStyle();
                    this.trigger('claim');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   var json = $.parseJSON(jqXHR.responseText);
                   console.log(json);
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
