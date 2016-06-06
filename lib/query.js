var db = require('./mysql').connect('115.159.53.240', 'heshe_stats', 'root', 'V9YjN9AkxEjX');

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