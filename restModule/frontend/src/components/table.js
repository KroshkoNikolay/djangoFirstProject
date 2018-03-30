import React, { Component } from 'react';

export default class UsersTable extends Component{
    render(){
        return (
            <table>
                {
                    this.props.list.map((item) => {
                        return <tr>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{item.birth_date}</td>
                            <td>
                                <button type='button'>Edit</button>
                            </td>
                            <td></td>
                        </tr>
                    })
                }
            </table>);
    }
}
