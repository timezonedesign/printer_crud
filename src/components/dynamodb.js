const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});

exports.handler = async (event) => {
    const table="printer_CRUD";
    const date=Date.now();

    switch (event.httpMethod) {
        case 'DELETE':
            var params = {
                TableName:table,
                Key:{
                    "date": date,
                },
                ConditionExpression:"0 <= :val",
                ExpressionAttributeValues: {
                    ":val": 1
                }
            };
            
            console.log("Attempting a conditional delete...");
            docClient.delete(params, function(err, data) {
                if (err) {
                    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    result(data);
                }
            });
            break;
        case 'GET':
            var params = {
                TableName: table,
                ProjectionExpression: "date, printer_name, printer_ip, printer_status"
            };
            
            docClient.scan(params, function(err, data) {
                if (err) {
                    console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    result(data);
                }
            });
            break;
        case 'POST':
            var params = {
                TableName:table,
                Item:{
                    "date": date,
                    "printer_name": event.printer_name,
                    "printer_ip": event.printer_ip,
                    "status": event.printer_status
                }
            };
            
            console.log("Adding a new item...");
            docClient.put(params, function(err, data) {
                if (err) {
                    console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    result(data);
                }
            });
            break;
        case 'PUT':
            var params = {
                TableName:table,
                Key:{
                    "date": date,
                },
                ExpressionAttributeValues:{
                    "printer_name": event.printer_name,
                    "printer_ip": event.printer_ip,
                    "status": event.printer_status
                },
                ReturnValues:"UPDATED_NEW"
            };
            
            console.log("Updating the item...");
            docClient.update(params, function(err, data) {
                if (err) {
                    console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    result(data);
                }
            });
            break;
        default:
            data=`Unsupported method "${event.httpMethod}"`;
            result(data);
    }
    function result(data){
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        return response;
    }
};