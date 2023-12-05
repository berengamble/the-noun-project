"use strict";
global.assert = require("assert"); //set assert to global so we don't have to keep requiring it

before(function (done) {
  var NounProject = require("../nounproject.js"),
    nounProject = new NounProject({
      //my personal keys, please don't use these in your project
      key: "b89aefc5f2564e00b6cf37f162dd96e4",
      secret: "702b0a5a52c143f8a4d184cbbb01af6e",
    });

  global.nounProject = nounProject;
  done();
});
