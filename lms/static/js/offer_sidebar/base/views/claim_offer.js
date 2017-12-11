;(function (define) {

define(['jquery', 'backbone'], function ($, Backbone) {
   'use strict';

    return Backbone.View.extend({

        el: '',
        events: {
            'click .offer-claim-button': 'claimOffer',
        },

        initialize: function () {
            this.$claimButton = this.$el.find('.offer-claim-button');
            this.$offerTokenField = this.$el.find('.offer-token-field');
            this.setInitialStyle();
        },

        claimOffer: function () {
            this.$offerTokenField.text('xxx-xxx-xxx');
            this.setActiveStyle();
            this.trigger('claim');
        },

        setActiveStyle: function () {
            this.$claimButton.hide();
            this.$offerTokenField.show();
        },

        setInitialStyle: function () {
            this.$claimButton.show();
            this.$offerTokenField.hide();
        }

    });

});

})(define || RequireJS.define);
