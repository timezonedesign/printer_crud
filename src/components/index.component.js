import React, { Component } from 'react';
// import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { printer: [] };
    }
    componentDidMount() {
        fetch('https://ma520tn9p2.execute-api.us-east-2.amazonaws.com/default/myFirstLambdaFunctionForPrinters',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'x-api-key': '3A4ef8N7hG3UjbuARDz994qjLNdV6zM56omEUL89'
            }
        })
        .then((response) => response.json())
        .then((responseJSON) => {
        // do stuff with responseJSON here...
        this.setState({ printer:responseJSON})
        })

    }

    tabRow() {
        return this.state.printer.map(function (object, i) {
            return <TableRow obj={object} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Printer List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Printer name</th>
                            <th>Printer IP</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}