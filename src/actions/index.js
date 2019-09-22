var AWS = require('aws-sdk');
let awsConfig = {
    'region': 'us-east-2',
    'endpoint': 'http://dynamodb.us-east-2.amazonaws.com',
    'accessKeyId': 'AKIAIHB6M22ZZHX25YXA', 'secretAccessKey': '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'
};
AWS.config.update(awsConfig);

export const docClient = new AWS.DynamoDB.DocumentClient();

// import axios from "axios";

// export const client = axios.create({
//   baseURL: "http://localhost:3030",
//   headers: {
//     "Content-Type": "application/json"
//   }
// })
