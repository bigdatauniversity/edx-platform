(function(define) {
  define(["jquery", "backbone"], function($, Backbone) {
    "use strict";

    return Backbone.View.extend({
      el: "",
      events: {
        "click .offer-claim-button": "claimOffer"
      },

      initialize: function() {
        console.log("offer sidebar initialize");
        this.$claimButton = this.$el.find(".offer-claim-button");
        this.$offerTokenField = this.$el.find(".offer-token-field");
        this.$offerClaimedWrapper = this.$el.find(".offer-claimed-wrapper");

        this.setLoadingStyle();

        var userInfo = $.cookie("edx-user-info").replace(/\\054/g, ",");
        this.$username = JSON.parse(JSON.parse(userInfo)).username;

        this.$promoCode = this.findCodeInLocalStorage(this.$username);
        if (this.$promoCode) {
          this.setActiveStyle(this.$promoCode);
        } else {
          this.$promoCode = this.retrieveClaimedPromoCode(this.$username);
          if (this.$promoCode) {
            this.setActiveStyle(this.$promoCode);
          } else {
            this.setInitialStyle();
          }
        }
      },

      claimOffer: function() {
        console.log("offer sidebar claimOffer");
        var self = this;

        this.setLoadingStyle();

        $.ajax({
          url: "/claim_ibm_cloud_token/" + this.$username,
          type: "GET",
          dataType: "html",
          contentType: "application/json",
          headers: { "X-CSRFToken": $.cookie("csrftoken") },
          notifyOnError: false,
          success: function(promoCode) {
            console.log("json: " + promoCode);
            self.saveCodeInLocalStorage(this.$username, promoCode);
            self.setActiveStyle(promoCode);
            self.trigger("claim");
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            this.setInitialStyle();
          }
        });
      },

      findCodeInLocalStorage: function(username) {
        var promoCodes = this.findAllSavedCodeInLocalStorage();
        if (promoCodes && promoCodes[username]) {
          return promoCodes[username];
        }
      },

      findAllSavedCodeInLocalStorage: function() {
        try {
          var promoCodes = localStorage.getItem("promoCodes");
          return promoCodes ? JSON.parse(promoCodes) : null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },

      saveCodeInLocalStorage: function(username, promoCode) {
        var promoCodes = this.findAllSavedCodeInLocalStorage();
        console.log("saveCodeInLocalStorage 1");
        if (promoCode){
            if (promoCodes[username] == null) {
                console.log("saveCodeInLocalStorage 2");
              promoCodes[username] = promoCode;
              console.log("saveCodeInLocalStorage 3");
              localStorage.setItem("promoCodes", JSON.stringify(promoCodes));
              console.log("saveCodeInLocalStorage 4");
            }
        }
      },

      retrieveClaimedPromoCode: function(username) {
        $.ajax({
          url: "/retrieve_claimed_code_for_user/" + username,
          type: "GET",
          dataType: "html",
          contentType: "application/json",
          headers: { "X-CSRFToken": $.cookie("csrftoken") },
          notifyOnError: false,
          success: function(promoCode) {
            return promoCode;
          },
          error: function(jqXHR, textStatus, errorThrown) {
            return null;
          }
        });
      },

      setActiveStyle: function(promoCode) {
        console.log("offer sidebar setActiveStyle");
        if (this.$promoCode != promoCode) {
          this.$promoCode = promoCode;
        }
        this.$offerTokenField.text(promoCode);
        $(".offer-sidebar-dismiss").click(function() {
          $(".offer-sidebar").hide();
        });
        this.$claimButton.hide();
        this.$offerClaimedWrapper.show();
      },

      setLoadingStyle: function(promoCode) {
        console.log("offer sidebar setLoadingStyle");
        this.$claimButton
          .html('<p class="loading-indicator"></p>')
          .prop("disabled", true);
        $(".loading-indicator").addClass("loading");
        this.$claimButton.show();
        this.$offerClaimedWrapper.hide();
      },

      setInitialStyle: function() {
        console.log("offer sidebar setInitialStyle");
        this.$claimButton.html("Claim your offer").prop("disabled", false);
        this.$claimButton.show();
        this.$offerClaimedWrapper.hide();
      }
    });
  });
})(define || RequireJS.define);
