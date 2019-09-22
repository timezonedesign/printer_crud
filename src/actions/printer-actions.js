import { docClient } from './';

let table = 'Printer_CRUD';

export function fetchOneByKey(date) {
    var params = {
        TableName: 'Printer_CRUD',
        Key: {
            "date": date
        }
    };
    return dispatch => {
      return dispatch({
        type: 'FETCH_PRINTER',
        prinloader: docClient.get(params, function(err, data){
          if(err){
              console.log("error - " + JSON.stringify(err, null, 2));
          } else {
              console.log("success - " + JSON.stringify(data, null, 2));
          }
        })
      })
    }
}

export function deleteOneByKey(date) {
    var params = {
        TableName:table,
        Key:{
            "date": date,
        }
    };
    return dispatch => {
      return dispatch({
        type: 'DELETE_PRINTER',
        prinloader: docClient.delete(params, function(err, data) {
          if (err) {
              console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("success - " + JSON.stringify(data, null, 2));
          }
      })
    })
  }
}
export function fetchAll(){
  var params = {
      TableName: table
  };
  return dispatch => {
    return dispatch({
      type: 'FETCH_PRINTERS',
      prinloader: docClient.scan(params, function(err, data) {
          if (err) {
              console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("success - " + data.Items[0].printer_ip);
          }
      })
    })
  }
}

export function addOne(event) {
    var params = {
        TableName:table,
        Item:{
            "date": event.date,
            "printer_name": event.printer_name,
            "printer_ip": event.printer_ip,
            "printer_status": event.printer_status
        }
    };
    return dispatch => {
      return dispatch({
        type: 'SAVE_PRINTER',
        prinloader: docClient.put(params, function(err, data) {
          if (err) {
              console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("success - " + JSON.stringify(data, null, 2));
          }
        })
      })
    }
}
        
export function updateOneByKey(event) {
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
    return dispatch => {
      return dispatch({
        type: 'UPDATE_PRINTER',
        prinloader: docClient.update(params, function(err, data) {
          if (err) {
              console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
          } else {
              console.log("success - " + JSON.stringify(data, null, 2));
          }
        })
      })
    }
}

export function newPrinter() {
  return dispatch => {
    dispatch({
      type: 'NEW_PRINTER'
    })
  }
}