//disabled
var environment = process.env.NODE_ENV || 'development';
var config = require("../knexfile")[environment];
var knex = require('knex')(config);
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
