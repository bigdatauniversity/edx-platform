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
            this.$offerClaimedWrapper = this.$el.find('.offer-claimed-wrapper');
            this.setInitialStyle();
        },

        claimOffer: function () {
            console.log("offer sidebar claimOffer");
            var self = this;
            var userInfo = $.cookie('edx-user-info').replace(/\\054/g, ',');
            var username = JSON.parse(JSON.parse(userInfo)).username;
            this.$claimButton.html('<p class="loading-indicator"></p>').prop("disabled", true);
            $(".loading-indicator").addClass("loading");
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
                    this.$claimButton.html("Claim your offer").prop("disabled", false);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(jqXHR.responseText);
                   this.$claimButton.html("Claim your offer").prop("disabled", false);
                }
            });
        },

        setActiveStyle: function () {
            console.log("offer sidebar setActiveStyle");
            this.$claimButton.hide();
            this.$offerClaimedWrapper.show();
        },

        setInitialStyle: function () {
            console.log("offer sidebar setInitialStyle");
            this.$claimButton.show();
            this.$offerClaimedWrapper.hide();
        }

    });

});

})(define || RequireJS.define);
