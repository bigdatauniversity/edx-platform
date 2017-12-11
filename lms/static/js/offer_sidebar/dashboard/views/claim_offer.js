;(function (define) {

define([
    'js/offer_sidebar/base/views/claim_offer'
], function (SearchForm) {
    'use strict';

    return SearchForm.extend({
        el: '#dashboard-offer-sidebar'
    });

});

})(define || RequireJS.define);
