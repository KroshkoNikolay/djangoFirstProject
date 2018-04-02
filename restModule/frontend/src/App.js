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
        this.addRecordHandler = this.addRecordHandler.bind(this);
        this.editRecordHandler = this.editRecordHandler.bind(this);
        this.editUser = this.editUser.bind(this);
        this.removeRecordHandler = this.removeRecordHandler.bind(this);
    }

    retrieveWholeList() {
        const self = this;
        fetch('http://localhost:8000/restlist/users/', {
            method: 'GET',
        })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("application/json")) {
                    return response.json();
                }
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
        this.setState({
            mode: 'newRecord',
        });

    }

    addRecordHandler(form) {
        const self = this;
        fetch('http://localhost:8000/restlist/users/', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("application/json")) {
                    response.json().then(function(result) {
                        if (response.ok){
                            return {'status': 'success', data: result}
                        } else {
                            return {'status': 'failed', data: result}
                        }
                    });
                }
                throw new TypeError("Oops, we haven't got JSON!");
            })
            .then(function(json) {
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

    editUser(id) {
        if (!id) return;
        const editData = this.state.usersList.find(function(elem){
            return elem.id === id;
        });
        if (!editData) return;
        this.setState({
            mode: 'editRecord',
            editUserData: editData
        });
    }

    editRecordHandler(data) {
        const self = this;
        fetch('http://localhost:8000/restlist/users/'+ data.id + '/', {
            method: 'PATCH',
            body: JSON.stringify(data.form),
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if(contentType && contentType.includes("application/json")) {
                    response.json().then(function(result) {
                        if (response.ok){
                            return {'status': 'success', data: result}
                        } else {
                            return {'status': 'failed', data: result}
                        }
                    });
                }
                throw new TypeError("Oops, we haven't got JSON!");
            })
            .then(function(json) {
                if (json.status === 'success') {
                    let list = self.state.usersList;
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].id === json.data.id) {
                            list[i] = json.data;
                            break;
                        }
                    }
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

    removeRecordHandler(id) {
        const self = this;
        fetch('http://localhost:8000/restlist/users/'+ id + '/', {
            method: 'DELETE',
        })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if (response.ok){
                    return {'status': 'success'}
                } else {
                    if(contentType && contentType.includes("application/json")) {
                        response.json().then(function(result) {
                            return {'status': 'failed', data: result}
                        });
                    }
                    throw new TypeError("Oops, we haven't got JSON!");
                }
            })
            .then(function(json) {
                if (json.status === 'success') {
                    let list = self.state.usersList.filter(function(elem){
                        return elem.id !== id;
                    });
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

    render() {
        const table = (state) => {
            if (state.mode === 'table' && state.usersList) {
                return <UsersTable list={state.usersList} itemEditHandler={this.editUser} removeRecordHandler={this.removeRecordHandler}/>
            }
            return null;
        };

        const form = () => {
            if (this.state.mode === 'newRecord')
                return <Form handler = {this.addRecordHandler}/>;
            else if (this.state.mode === 'editRecord')
                return <Form handler = {this.editRecordHandler} data={this.state.editUserData}/>;
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
