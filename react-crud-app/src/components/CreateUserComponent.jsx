import React, { Component } from 'react'
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

            id: this.props.match.params.id,
            name: '',
            age: '',
            city: '',
            state: '',
            pincode: '',
            //email: '',
            errorMessage: ''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAgeHandler = this.changeAgeHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.changePincodeHandler = this.changePincodeHandler.bind(this);
        {/*this.changeemailHandler = this.changeemailHandler.bind(this);*/ }
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    componentDidMount() {

        if (this.state.id === '_add') {
            return
        } else {
            UserService.getUserById(this.state.id).then((res) => {
                let user = res.data;
                this.setState({
                    name: user.name,
                    age: user.age,
                    city: user.city,
                    state: user.state,
                    pincode: user.pincode

                });
            });
        }
    }

    saveOrUpdateUser = (e) => {
        e.preventDefault();

        let user = {
            id: this.state.id,
            name: this.state.name, age: this.state.age,
            city: this.state.city, state: this.state.state, pincode: this.state.pincode
        };
        console.log('user => ' + JSON.stringify(user));

        if (this.state.id === '_add') {
            UserService.createUser(user).then(res => {
                this.props.history.push('/users');
            }, err => this.setState({ errorMessage: err.message }));
        } else {
            UserService.updateUser(user, this.state.id).then(res => {
                this.props.history.push('/users');
            }, err => this.setState({ errorMessage: err.message }));
        }
    }

    changeNameHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    changeCityHandler = (event) => {
        this.setState({ city: event.target.value });
    }

    changeAgeHandler = (event) => {
        this.setState({ age: event.target.value });
    }
    changeStateHandler = (event) => {
        this.setState({ state: event.target.value });
    }
    changePincodeHandler = (event) => {
        this.setState({ pincode: event.target.value });
    }

    cancel() {
        this.props.history.push('/users');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add User</h3>
        } else {
            return <h3 className="text-center">Update User</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Name: </label>
                                        <input placeholder="Name" name="Name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Age: </label>
                                        <input placeholder="Age" name="Age" className="form-control"
                                            value={this.state.age} onChange={this.changeAgeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> City: </label>
                                        <input placeholder="City" name="City" className="form-control"
                                            value={this.state.city} onChange={this.changeCityHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> State: </label>
                                        <input placeholder="State" name="State" className="form-control"
                                            value={this.state.state} onChange={this.changeStateHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Pincode: </label>
                                        <input placeholder="Pincode" name="Pincode" className="form-control"
                                            value={this.state.pincode} onChange={this.changePincodeHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>

                                    {this.state.errorMessage &&
                                        <h5 className="alert alert-danger">
                                            {this.state.errorMessage} </h5>}
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateUserComponent
