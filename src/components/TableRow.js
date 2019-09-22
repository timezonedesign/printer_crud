import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';

class TableRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        var send_data = 'https://s5t6r0ozpl.execute-api.us-east-2.amazonaws.com/default/DeletePrinterLambdaFunction?date='+this.props.obj.date;
        fetch(send_data,{
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'x-api-key': '7JrM9kXnVE3M504Gljbi52omKQ3949jJ91X75oj6'
            }
        }).then(response => response.json())
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.printer_name}
                </td>
                <td>
                    {this.props.obj.printer_ip}
                </td>
                <td>
                    {this.props.obj.printer_status}
                </td>
                <td>
                    <Link to={"/edit/" + this.props.obj.date} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <Link to={"/index"} onClick={this.delete} className="btn btn-danger">Delete</Link>
                </td>
            </tr>
        );
    }
}

export default TableRow;