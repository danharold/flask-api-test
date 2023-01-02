import React from "react";
import axios from "axios";

import {
    Textarea,
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
        this.onNewPost = props.onNewPost.bind(this);
    }

    handleChange(event) {
        this.setState({body: event.target.value});
        if (event.target.value === "") {
            event.target.parentNode.nextElementSibling.classList.add("hidden")
        } 
        else {
            event.target.parentNode.nextElementSibling.classList.remove("hidden")
        }
        //console.log(event.target.value)
    }
    
    handleSubmit(event) {
        //alert('SUBMITTED: ' + this.state.body);
        
        event.preventDefault();

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
        }).then((res) => {
            console.log(res)
            this.props.onNewPost(res.data);
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className='relative max-w-screen-xl'>
                <Textarea onChange={this.handleChange} className="" label="Say something"/>
                <Button type="submit" className='hidden !absolute p-2 -bottom-2 right-6'>POST</Button>
            </form>
        );
    }
}

export default CreatePostForm;