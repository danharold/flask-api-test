import React from "react";
import axios from 'axios';

import {
    Input,
    Button
} from '@material-tailwind/react';

import { Navigate, NavLink } from 'react-router-dom';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            password2: "",
            display_username: "",
            email: "",
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
        if (this.state.password === this.state.password2) {
            console.log({
                username: this.state.username,
                display_username: this.state.display_username,
                email: this.state.email,
                password: this.state.password
            })
            axios.post('/api/users', {
                username: this.state.username,
                display_username: this.state.display_username,
                email: this.state.email,
                password: this.state.password
            },{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
                console.log(res)
                this.setState({redirect: true})
            })
        }
        else {
            console.log("Password mismatch")
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to="/login"/>
        }
        return (
            <div className="flex flex-col mx-auto justify-center items-center h-[50vh] max-w-sm">
                <div className="mb-2 w-full">
                    <Input 
                        label="Username"
                        name="username"
                        // value={this.state.username} 
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-4 w-full">
                    <Input 
                        label="Display Username"
                        name="display_username"
                        // value={this.state.username} 
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-4 w-full">
                    <Input 
                        label="Email"
                        name="email"
                        // value={this.state.username} 
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-2 w-full">
                    <Input 
                        type="password"
                        label="Password"
                        name="password"
                        // value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="mb-4 w-full">
                    <Input 
                        type="password"
                        label="Confirm Password"
                        name="password2"
                        // value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <Button 
                    className="mb-4 w-full"
                    onClick={this.handleSubmit}
                >Register</Button>
                <div className="flex items-center justify-center mb-4 pt-2 border-t-2 border-t-gray-300 w-full">
                    <p>Already have an account?</p>
                    <NavLink to="/login"><Button 
                        className="ml-4 p-2 pl-3 pr-3"
                    >Login</Button></NavLink>
                </div>
            </div>
        )
    }

}

export default RegisterForm