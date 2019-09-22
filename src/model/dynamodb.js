var AWS = require('aws-sdk');
let awsConfig = {
    'region': 'us-east-2',
    'endpoint': 'http://dynamodb.us-east-2.amazonaws.com',
    'accessKeyId': 'AKIAIHB6M22ZZHX25YXA', 'secretAccessKey': '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'
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();
let table = 'Printer_CRUD';

let fetchOneByKey = function() {
    var params = {
        TableName: 'Printer_CRUD',
        Key: {
            "date": '*'
        }
    };
    console.log(params);
    docClient.get(params, function(err, data){
        if(err){
            console.log("error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("success - " + JSON.stringify(data, null, 2));
        }
    })
}

let deleteOneByKey = function(date) {
    var params = {
        TableName:table,
        Key:{
            "date": date,
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
let fetchAll = function(){
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

let addOne = function(event) {
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
        
let updateOneByKey = function(event) {
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

var event = {
    "date": 3,
    "printer_name": 'Canon',
    "printer_ip": '255.255.25.255',
    "printer_status": 'active'
};

// addOne(event);
fetchAll();
// updateOneByKey(event);
// deleteOneByKey(0);


var AWS = require('aws-sdk'),
    docClient = new AWS.DynamoDB.DocumentClient();
exports.handler = function(event, context, callback){
    var date = Date.now();
    var params = {
        TableName:'Printer_CRUD',
        Item:{
            "date": date,
            "printer_name": event.printer_name,
            "printer_ip": event.printer_ip,
            "printer_status": event.printer_status
        }
    };
    
    docClient.put(params, function(err, data) {
        if (err) {
            callback(err,null);
        } else {
            callback(null, 'success');
        }
    });
}


{
    "printer_name": "$input.params('printer_name')",
    "printer_ip": "$input.params('printer_ip')",
    "printer_status": "$input.params('printer_status')"
}