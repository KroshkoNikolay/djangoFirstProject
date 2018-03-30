import React, { Component } from 'react';

export default class Form extends Component{
    constructor(props) {
        super(props);
        this.state = {
            first_name: this.props.first_name || '',
            last_name: this.props.last_name || '',
            email: this.props.email || '',
            birth_date: this.props.birth_date || ''
        }
    }

    handleChange(inputId, e) {
        const stateObject = function() {
            const returnObj = {};
            returnObj[inputId] = e.target.value;
            return returnObj;
        }.bind(e)();
        this.setState(stateObject);
    }

    onSubmit() {
        this.props.handler(this.state);
    }


    render(){
        return (<table>
            <tbody>
                <tr>
                    <td><label htmlFor="first_name">First name:</label></td>
                    <td><input type="text" id="first_name" name="first_name"
                               value={this.state.first_name}
                               onChange={ this.handleChange.bind(this, 'first_name') }/></td>
                </tr>
                <tr>
                    <td><label htmlFor="last_name">Last name:</label></td>
                    <td><input type="text" id="last_name" name="last_name"
                               value={this.state.last_name}
                               onChange={ this.handleChange.bind(this, 'last_name') }/></td>
                </tr>
                <tr>
                    <td><label htmlFor="mail">E-mail:</label></td>
                    <td><input type="email" id="mail" name="mail"
                               value={this.state.email}
                               onChange={ this.handleChange.bind(this, 'email') }/></td>
                </tr>
                <tr>
                    <td><label htmlFor="birth_date">Birth-date:</label></td>
                    <td><input type="date" id="birth_date" name="birth_date"
                               value={this.state.birth_date}
                               onChange={ this.handleChange.bind(this, 'birth_date') }/></td>
                </tr>
                <tr>
                    <td/>
                    <td>
                        <button type='button' onClick={this.onSubmit.bind(this)}>Save</button>
                    </td>
                </tr>
            </tbody>
        </table>);
    }
}
