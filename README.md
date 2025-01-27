# The Noun Project - V2 API Wrapper

[![npm version](https://badge.fury.io/js/the-noun-project-v2.svg)](http://badge.fury.io/js/the-noun-project-v2)
<!-- [![Build Status](https://travis-ci.org/rosshettel/the-noun-project.svg?branch=master)](https://travis-ci.org/rosshettel/the-noun-project) -->

Node.js wrapper for The Noun Project's API.

This is heavily based on Ross Hettel's original wrapper for the V1 API. The V2 API has less endpoints, which I have removed from this package.

## Installation

Simply add to your project with

```bash
npm install the-noun-project-v2
```

In your project file:

```javascript
var NounProject = require("the-noun-project-v2"),
  nounProject = new NounProject({
    key: "foo",
    secret: "bar",
  });
```

You can get your keys from [The Noun Project's API page](https://thenounproject.com/api/).

## Usage

See [The Noun Project API Explorer](http://api.thenounproject.com/explorer) for more information on the endpoints available.

The query string `options` object is optional and can be omitted. See the tests for more information.

```javascript
nounProject.getIconsByTerm("goat", { limit: 5 }, function (err, data) {
  if (!err) {
    console.log(data.icons);
  }
});
```

**or**

```javascript
nounProject.getIconsByTerm("goat", function (err, data) {
  if (!err) {
    console.log(data.icons);
  }
});
```
