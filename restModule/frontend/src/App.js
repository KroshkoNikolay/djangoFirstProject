import React, { Component } from 'react';
import './App.css';
import UsersTable from './components/table'
import Form from './components/form'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: null,
            errorMsg: null,
            mode: 'table',
            error: false
        };
        this.retrieveWholeList();
        this.addRecordHandler = this.addRecordHandler.bind(this)
    }

    retrieveWholeList() {
        const self = this;
        fetch('http://localhost:8000/restlist/users', {
            method: 'GET',
        })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("application/json")) {
                    return response.json();
                }
                // return JSON.parse('[{"id":1,"first_name":"11111111111","last_name":"l1111111111","email":"sgdfgsdfg@dfg.dgh","birth_date":"2005-10-04"},{"id":2,"first_name":"ghdfgvs","last_name":"dfgh","email":"xjo@gmail.comdfg","birth_date":"2018-03-27"},{"id":3,"first_name":"222","last_name":"222","email":"sddff@dfg.fg","birth_date":"1999-05-05"},{"id":4,"first_name":"123","last_name":"erwer","email":"wefsf@sdf.ghj","birth_date":"1990-03-04"},{"id":5,"first_name":"1234","last_name":"1234","email":"asdfa@fs.fgh","birth_date":"2018-03-23"},{"id":6,"first_name":"ghdfgvs","last_name":"dfgh","email":"xjodffossdfdfux@gmail.comdfg","birth_date":"2018-03-27"}]');
                throw new TypeError("Oops, we haven't got JSON!");
            })
            .then(function(json) {
                self.setState({
                    usersList: json,
                    error: false
                });
            })
            .catch(function(error) {
                self.setState({
                    error: true,
                    errorMsg: error
                });
                console.log(error);
            });
    }

    addNewUser(){
        console.log('add new');
        this.setState({
            mode: 'newRecord',
        });

    }

    addRecordHandler(form) {
        const self = this;
        console.log(form)
        fetch('http://localhost:8000/restlist/users', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("application/json")) {
                    const data = response.json().then(function(result) {
                        if (response.ok){
                            return {'status': 'success', data: result}
                        } else {
                            return {'status': 'failed', data: result}
                        }
                    });
                    return data;
                }
                throw new TypeError("Oops, we haven't got JSON!");
            })
            .then(function(json) {
                console.log(json)
                if (json.status === 'success') {
                    let list = self.state.usersList;
                    list.push(json.data);
                    self.setState({
                        usersList: list,
                        error: false,
                        mode: 'table',
                    });
                } else {
                    self.setState({
                        error: true,
                        errorMsg: json.data
                    });
                }

            })
            .catch(function(error) {
                console.log(error);
            });
    }

    editRecordHandler(e) {
        e.preventDefault()
        // this.setState({
        //     someVar: someValue
        // })
    }

    render() {
        const table = (state) => {
            if (state.mode === 'table' && state.usersList) {
                return <UsersTable list={state.usersList}/>
            }
            return null;
        };

        const form = () => {
            if (this.state.mode === 'newRecord')
                return <Form handler = {this.addRecordHandler}/>;
            else if (this.state.mode === 'editRecord')
                return <Form handler = {this.editRecordHandler} data={''}/>;
            else
                return null

        };

        const errors = () => {
            const errors = this.state.errorMsg;
            if (this.state.error && typeof(errors) === 'object' && Object.keys(errors).length > 0){
                const keys = Object.keys(errors);
                return (<div>
                    {
                        keys.map((key) => {
                            return <div> error in field {key}: "{errors[key]}"</div>
                        })
                    }
                </div>)
            }
            else
                return null

        };

        return (
            <div>
                <button type="button" onClick={this.addNewUser.bind(this)}>Add user</button>
                {errors()}
                {table(this.state)}
                {form()}
            </div>)
    }
}

export default App;
