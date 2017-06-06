(function (define) {
    define([], function() {
        var CCSegment = {
            track: function (eventName, eventProperty) {
                window.bluemixAnalytics.trackEvent(eventName, eventProperty);
            }
        };
        return CCSegment;
    });
}).call(this, define || RequireJS.define);