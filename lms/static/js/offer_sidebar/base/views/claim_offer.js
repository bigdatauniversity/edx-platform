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
            console.log(this.$claimButton);
            console.log(this.$offerTokenField);
        },

        claimOffer: function () {
            console.log("offer sidebar clainOffer");
            this.$offerTokenField.text('xxx-xxx-xxx');
            this.setActiveStyle();
            this.trigger('claim');
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
