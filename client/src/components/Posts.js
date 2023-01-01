import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    Typography,
    CardBody,
    CardFooter,
    IconButton
} from "@material-tailwind/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts').then((response) => {
            setPosts(response.data)
        });
    }, []);

    function deletePost() {
        // TODO: delete post on click
        alert("DELETE")
    }

    return (
        <>
            {posts.map(item =>
                <Card key={item.timestamp.$date} className="my-10 bg-white order-radius-0 drop-shadow-md rounded-none">
                    <CardBody className="">
                        <Typography variant="h5" className="mb-2">
                            {item.username} said:
                        </Typography>
                        <Typography>
                            {item.body}
                        </Typography>
                    </CardBody>
                    <IconButton ripple={false} variant="text" onClick={deletePost} value="DELETE" className="!absolute right-2 top-2 rounded-full text-lg w-6 h-6">
                        <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
                    </IconButton>
                    <CardFooter divider className="flex items-center justify-between py-3">
                        <Typography variant="small" color="gray">
                            {item.timestamp.$date}
                        </Typography>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}