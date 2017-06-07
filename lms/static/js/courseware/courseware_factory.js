(function(define) {
    'use strict';

    define([
        'jquery'
    ],
        function($) {
            return function() {
                // This function performs all actions common to all courseware.
                // 1. adding an event to all link clicks.
                $('a:not([href^="#"])').click(function(event) {
                    console.log('click blablabla');
                });
            };
        }
    );
}).call(this, define || RequireJS.define);