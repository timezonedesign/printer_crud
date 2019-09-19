import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = { printer: [] };
    }
    componentDidMount() {
        var authOptions = {
            method: 'GET',
            url: 'https://i0ny64i41e.execute-api.us-east-2.amazonaws.com/default',
            // data: qs.stringify(data),
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': 'true'
            },
            // json: true
        };
 
        axios(authOptions)
            .then(response => {
                this.setState({ printer: JSON.parse(response.data) });
            })
            .catch(function (error) {
                console.log(error);
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