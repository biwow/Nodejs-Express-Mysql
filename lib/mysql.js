var client = null;
var mysql = require('mysql');

exports.connect = function (host, dbName, user, pass) {
    client = mysql.createConnection({
        host: host,
        user: user,
        password: pass,
        database: dbName
    });
    client.connect();
    return client;
};
