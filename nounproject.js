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

  //icon : Operations on icon endpoints
  this.getIconById = function (id, options, callback) {
    var path = "/icon/" + id;
    if (Util.isFunction(options)) {
      callback = options;
      options = {};
    }
    self.get(path, options, callback);
  };

  this.downloadIconById = function (icon_id, options, callback) {
    var path = "/icon/" + icon_id + "/download";
    self.get(path, options, callback);
  };

  this.getIconByTerm = function (term, callback) {
    self.getIconsByTerm(term, { limit: 1 }, callback);
  };

  this.getIconsByTerm = function (term, options, callback) {
    var path = "/icon/";

    // Check if 'options' is actually the callback function
    if (Util.isFunction(options)) {
      callback = options;
      options = {};
    }
    options.query = term.replace(" ", "-"); // make searches with spaces to work
    if (options.limit_to_public_domain === true) {
      options.limit_to_public_domain = "1";
    }

    self.get(path, options, callback);
  };

  //oauth : Operations on oauth endpoints
  this.getUsage = function (callback) {
    self.get("/client/usage", callback);
  };

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
        callback(
          new Error(
            "Calling Noun Project API: " + url + " " + JSON.stringify(err)
          )
        );
      } else if (res.statusCode !== 200) {
        callback(res.statusCode + " HTTP response code");
      } else {
        callback(null, JSON.parse(data));
      }
    });
  };
});
