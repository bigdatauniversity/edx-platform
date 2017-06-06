;(function (define) {
    'use strict';
    define([], function() {
        var CCSegment = {
            trackEvent: function (eventName, eventProperty) {
                window.bluemixAnalytics.trackEvent(eventName, eventProperty);
            }
        };
        return CCSegment;
    });
}).call(this, define || RequireJS.define);