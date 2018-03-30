import React, { Component } from 'react';
import './App.css';
import UsersTable from './components/table'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: null,
            errormsg: false
        };
        this.retrieveWholeList();
    }

    retrieveWholeList() {
        const self = this;
        fetch('/restlist/users', {
            method: 'GET',
        })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("application/json")) {
                    console.log(response)
                    return response.json();
                }
                // return JSON.parse('[{"id":1,"first_name":"11111111111","last_name":"l1111111111","email":"sgdfgsdfg@dfg.dgh","birth_date":"2005-10-04"},{"id":2,"first_name":"ghdfgvs","last_name":"dfgh","email":"xjo@gmail.comdfg","birth_date":"2018-03-27"},{"id":3,"first_name":"222","last_name":"222","email":"sddff@dfg.fg","birth_date":"1999-05-05"},{"id":4,"first_name":"123","last_name":"erwer","email":"wefsf@sdf.ghj","birth_date":"1990-03-04"},{"id":5,"first_name":"1234","last_name":"1234","email":"asdfa@fs.fgh","birth_date":"2018-03-23"},{"id":6,"first_name":"ghdfgvs","last_name":"dfgh","email":"xjodffossdfdfux@gmail.comdfg","birth_date":"2018-03-27"}]');
                throw new TypeError("Oops, we haven't got JSON!");
            })
            .then(function(json) {
                self.setState({
                    usersList: json,
                    errormsg: false
                });
            })
            .catch(function(error) {
                self.setState({
                    usersList: null,
                    errormsg: true
                });
                console.log(error);
            });
    }

    render() {
        if (this.state.usersList) {
            return <UsersTable list={this.state.usersList}/>
        } else {
            return false;
        }
    }
}

export default App;
