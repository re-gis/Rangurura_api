"use strict";
const algoliasearch = require("algoliasearch");
const client = algoliasearch("APP_ID", "ADMIN_KEY");
const index = client.initIndex("rangurura");
module.exports = { client, index };
