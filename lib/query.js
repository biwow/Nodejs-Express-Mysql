var db = require('./mysql').connect('host', 'dbname', 'root', 'pass');

exports.index = function (sql,callback) {
    db.query(sql, function (err, result) {
        if (err === null) {
            if(isEmptyObject(result)){
                result=null;
            }
            callback(result);
        }
    });
}

function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}