import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Textarea,
    Typography,
    Button
} from '@material-tailwind/react';

class CreatePostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({body: event.target.value});
    }
    
    handleSubmit(event) {
        //alert('SUBMITTED: ' + this.state.body);
        axios.post('/api/posts', {
            body: this.state.body
        },{
            auth: {
                username: 'cat',
                password: 'meow'
            },
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).catch(res => {
            console.log(res.response.data.message)
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='relative max-w-screen-xl'>
                <Textarea onChange={this.handleChange} className="" label="Say something"/>
                <Button type="submit" className='!absolute p-2 -bottom-2 right-6'>POST</Button>
            </form>
        );
    }
}

export default CreatePostForm;