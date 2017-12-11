;(function (define) {
    'use strict';

    define(['backbone', 'js/offer_sidebar/base/views/claim_offer'],
        function(Backbone, OfferSidebar) {

            return function () {

                var offerSidebar = new OfferSidebar();
                var dispatcher = _.clone(Backbone.Events);

            };

        });

})(define || RequireJS.define);
