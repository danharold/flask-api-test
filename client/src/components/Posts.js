import axios from "axios";
import React, { useState, useEffect } from "react";
import {
    Card,
    Typography,
    CardBody,
    CardFooter
} from "@material-tailwind/react";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts').then((response) => {
            setPosts(response.data)
        });
    }, []);

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