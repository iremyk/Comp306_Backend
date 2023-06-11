const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'comp306-mysql.mysql.database.azure.com',
  user: 'comp306admin',
  password: '123456db.',
  database: 'imdb',
  port: 3306
});

module.exports = connection;
