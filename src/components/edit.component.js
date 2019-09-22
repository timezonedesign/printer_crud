import React, { Component } from 'react';
// import axios from 'axios';

export default class Edit extends Component {
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

    componentDidMount() {
        var send_data = 'https://2zrpoqfr5c.execute-api.us-east-2.amazonaws.com/default/FetchOnePrinterLambdaFunction?date='+this.props.match.params.id;
            fetch(send_data,{
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'x-api-key': 'TIOdaptLaM28OMktdQ45H4IQXd3x6ea411XO5XJZ'
                }
            }).then(response => response.json())
            .then((responseJSON) => {
                this.setState({
                    date: responseJSON.date,
                    printer_name: responseJSON.printer_name,
                    printer_ip: responseJSON.printer_ip,
                    printer_status: responseJSON.printer_status
                })
            })
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
        var send_data = 'https://fx7rtpuhef.execute-api.us-east-2.amazonaws.com/default/UpdatePrinterLambdaFunction?date='+this.props.match.params.date+'&printer_name='+this.state.printer_name+'&printer_ip='+this.state.printer_ip+'&printer_status='+this.state.printer_status;
        fetch(send_data,{
            headers:{
                'Content-Type': 'application/json',
                'x-api-key': '17SHiVjukcNwatOcFFZ47pQUdHB8B5U3ezRAm5r4'
            },
            method: 'PUT'
        }).then(response => response.json())

        this.props.history.push('/index');
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3 align="center">Update Printer</h3>
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
                        <input type="submit"
                            value="Update Printer"
                            className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}