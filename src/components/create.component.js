import React, { Component } from 'react';
// import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.onChangePrinterName = this.onChangePrinterName.bind(this);
        this.onChangePrinterIP = this.onChangePrinterIP.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            printer_name: '',
            printer_ip: '',
            printer_status: ''
        }
    }
    onChangePrinterName(e) {
        this.setState({
            printer_name: e.target.value
        });
    }
    onChangePrinterIP(e) {
        this.setState({
            printer_ip: e.target.value
        })
    }
    onChangeStatus(e) {
        this.setState({
            printer_status: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        var send_data = 'https://q5gsfo2cj9.execute-api.us-east-2.amazonaws.com/default/AddPrinterLambdaFunction?'+'printer_name='+this.state.printer_name+'&printer_ip='+this.state.printer_ip+'&printer_status='+this.state.printer_status;
        fetch(send_data,{
            headers:{
                'Content-Type': 'application/json',
                'x-api-key': 'EeRMMn1zO1CjTqROPc2Q868Nc0WEfSu32gebp0Cd'
            },
            method: 'POST'
        }).then(response => response.json())

        this.setState({
            printer_name: '',
            printer_ip: '',
            printer_status: ''
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add New Printer</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Printer Name:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.printer_name}
                            onChange={this.onChangePrinterName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Printer IP: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.printer_ip}
                            onChange={this.onChangePrinterIP}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.printer_status}
                            onChange={this.onChangeStatus}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Printer" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}