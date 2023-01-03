import React from 'react';
import axios from 'axios';

import {
    Input,
    Button
} from '@material-tailwind/react';

import { Navigate } from 'react-router-dom';


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit(event) {
        axios.post('/api/users/login', 
            {
                username: this.state.username,
                password: this.state.password
            },{
                headers: {
                    "Content-Type": "multipart/form-data"
                }   
        }).then((res) => {
            document.cookie = `auth-token=${res.data['auth-token']}; path=/`
            this.setState({ redirect: true });
        }).catch((err) => {
            alert(err.response.data.message)
        });
    };

    render() {
        if (this.state.redirect) {
            return <Navigate to="/"/>
        }
        return (
            <div className="flex flex-col mx-auto justify-center items-center h-[50vh] w-80">
                <div className="mb-4 w-full">
                    <Input 
                        label="Username"
                        name="username"
                        // value={this.state.username} 
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-4 w-full">
                    <Input 
                        type="password"
                        label="Password"
                        name="password"
                        // value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <Button 
                    className="mb-4 w-full"
                    onClick={this.handleSubmit}
                >Sign In</Button>
                <a className="text-center text-md font-thin text-gray-700 mb-2">Forgot password?</a>
                <div className="flex items-center justify-center mb-4 pt-2 border-t-2 border-t-gray-300 w-full">
                    <p>Don't have an account?</p>
                    <Button 
                        className="ml-4 p-2 pl-3 pr-3"
                    >Register</Button>
                </div>
            </div>
        );
    }
}

export default LoginForm;