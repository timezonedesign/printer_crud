import React, { Component } from 'react';
import axios from 'axios';

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
            status: ''
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
            status: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            printer_name: this.state.printer_name,
            printer_ip: this.state.printer_ip,
            status: this.state.status
        };
        axios.post('http://localhost:4000/business/add', obj)
            .then(res => console.log(res.data));

        this.setState({
            printer_name: '',
            printer_ip: '',
            status: ''
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
                            value={this.state.status}
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