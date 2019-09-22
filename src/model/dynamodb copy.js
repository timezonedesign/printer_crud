var AWS = require('aws-sdk'),
    docClient = new AWS.DynamoDB.DocumentClient();

let table = 'Printer_CRUD';

exports.fetchOneByKey = function(event, context, callback) {
    var params = {
        TableName: table,
        Key: {
            "date": event.date
        }
    };
    
    docClient.get(params, function(err, data){
        if(err){
            console.log("error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("success - " + JSON.stringify(data, null, 2));
        }
    })
}

exports.deleteOneByKey = function(event, context, callback) {
    var params = {
        TableName:table,
        Key:{
            "date": event.date,
        }
    };
    
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("success - " + JSON.stringify(data, null, 2));
        }
    });
}
exports.fetchAll = function(event, context, callback){
    var params = {
        TableName: table
    };
    
    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("success - " + data.Items[0].printer_ip);
        }
    });
}

exports.addOne = function(event, context, callback) {
    var params = {
        TableName:table,
        Item:{
            "date": event.date,
            "printer_name": event.printer_name,
            "printer_ip": event.printer_ip,
            "printer_status": event.printer_status
        }
    };
    
    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("success - " + JSON.stringify(data, null, 2));
        }
    });
}
        
exports.updateOneByKey = function(event, context, callback) {
    var params = {
        TableName:table,
        Key:{
            "date": event.date,
        },
        UpdateExpression: "set printer_name = :n, printer_ip=:p, printer_status=:s",
        ExpressionAttributeValues:{
            ":n": event.printer_name,
            ":p": event.printer_ip,
            ":s": event.printer_status
        },
        ReturnValues:"UPDATED_NEW"
    };

    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("success - " + JSON.stringify(data, null, 2));
        }
    });
}
