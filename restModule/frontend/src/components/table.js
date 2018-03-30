import React, { Component } from 'react';

export default class UsersTable extends Component{
    render(){
        console.log('table');
        console.log(this.props);
        return (
            <table>
                {
                    this.props.list.map((item) => {
                        return <tr>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                            <td>{item.birth_date}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    })
                }
            </table>);
    }
}
