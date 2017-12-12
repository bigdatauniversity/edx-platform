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
            var userInfo = $.cookie('edx-user-info').replace(/\\054/g, ',');
            var username = JSON.parse(JSON.parse(userInfo)).username;
            var self = this;
            $.ajax({
                url: '/claim_ibm_cloud_token/'+username,
                type: 'GET',
                dataType : "html",
                contentType: "application/json",
                headers: {'X-CSRFToken': $.cookie('csrftoken')},                
                notifyOnError: false,
                success: function(json) {
                    console.log("json: "+json);
                    self.$offerTokenField.text(json);
                    self.setActiveStyle();
                    self.trigger('claim');
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
