import React, { Component } from 'react';

export default class UsersTable extends Component{
    render(){
        return (
            <table>
                <tbody>
                {
                    this.props.list.map((item) => {
                        return <tr>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{item.birth_date}</td>
                            <td>
                                <button type='button' onClick={this.props.itemEditHandler.bind(null, item.id)}>Edit</button>

                            </td>
                            <td>
                                <button type='button' onClick={this.props.removeRecordHandler.bind(null, item.id)}>Remove</button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>);
    }
}
