;(function (define) {
    'use strict';

    define(['backbone', 'js/offer_sidebar/dashboard/views/claim_offer'],
        function(Backbone, OfferSidebar) {

            return function () {

                var offerSidebar = new OfferSidebar();
                console.log("offerSidebar loaded "+offerSidebar);
                var dispatcher = _.clone(Backbone.Events);

            };

        });

})(define || RequireJS.define);
