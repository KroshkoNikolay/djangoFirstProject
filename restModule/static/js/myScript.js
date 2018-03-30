(function(){
    class usersTable extends React.Component{
        constructor(props) {
            super(props);
        }

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


    class Welcome extends React.Component {
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
                    return response.json();
                }
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
                return <usersTable list={this.state.usersList}/>
            } else {
                return false;
            }
        }
    }

    const root = document.getElementById('root');
    ReactDOM.render(<Welcome/>, root);
} ());
