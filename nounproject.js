"use strict";

var OAuth = require("oauth"),
  Util = require("./util"),
  baseUrl = "https://api.thenounproject.com/v2";

var Client = (module.exports = function (config) {
  var oauth = new OAuth.OAuth(
      baseUrl,
      baseUrl,
      config.key || "",
      config.secret || "",
      "1.0",
      null,
      "HMAC-SHA1"
    ),
    self = this;

  //collection: Operations on collection endpoints
  // this.getCollectionIconsById = function (id, options, callback) {
  //   console.log("getCollectionIconsById", id, options, callback);
  //   var path = ["/collection/", id, "/icons"].join("");
  //   self.get(path, options, callback);
  // };

  // this.getCollectionIconsBySlug = function (slug, options, callback) {
  //   var path = ["/collection/", slug, "/icons"].join("");
  //   self.get(path, options, callback);
  // };

  // this.getCollectionById = function (id, callback) {
  //   var path = ["/collection/", id].join("");
  //   self.get(path, callback);
  // };

  // this.getCollectionBySlug = function (slug, callback) {
  //   var path = ["/collection/", slug].join("");
  //   self.get(path, callback);
  // };

  //icon : Operations on icon endpoints
  this.getIconById = function (id, callback) {
    var path = ["/icon/", id].join("");
    self.get(path, callback);
  };

  this.getIconByTerm = function (term, callback) {
    self.getIconsByTerm(term, { limit: 1 }, callback);
  };

  //icons : Operations on icons endpoints
  //   this.getRecentIcons = function (options, callback) {
  //     self.get("/icons/recent_uploads", options, callback);
  //   };

  this.getIconsByTerm = function (term, options, callback) {
    var path = "/icon/";

    // Check if 'options' is actually the callback function
    if (Util.isFunction(options)) {
      callback = options;
      options = {};
    }
    options.query = term;
    if (options.limit_to_public_domain === true) {
      options.limit_to_public_domain = "1";
    }

    self.get(path, options, callback);
  };

  //oauth : Operations on oauth endpoints
  this.getUsage = function (callback) {
    self.get("/client/usage", callback);
  };

  //user : Operations on user endpoints
  //   this.getUserCollection = function (userId, slug, callback) {
  //     var path = ["/client/", userId, "/collections/", slug].join("");
  //     self.get(path, callback);
  //   };

  //   this.getUserCollections = function (userId, callback) {
  //     var path = ["/client/", userId, "/collections"].join("");
  //     self.get(path, callback);
  //   };

  //   this.getUserUploads = function (username, options, callback) {
  //     var path = ["/client/", username, "/uploads"].join("");
  //     self.get(path, options, callback);
  //   };

  this.get = function (path, options, callback) {
    var url;
    //no options provided
    if (Util.isFunction(options)) {
      callback = options;
      options = {};
    }

    url = baseUrl + path + Util.objectToQueryString(options);

    oauth.get(encodeURI(url), null, null, function (err, data, res) {
      if (err) {
        callback(new Error("Noun Project API: " + err));
      } else if (res.statusCode !== 200) {
        callback(res.statusCode + " HTTP response code");
      } else {
        callback(null, JSON.parse(data));
      }
    });
  };
});
