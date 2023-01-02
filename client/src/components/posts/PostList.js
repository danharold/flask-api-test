import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from './Post'

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts').then((response) => {
            setPosts(response.data)
        });
    }, []);

    return (
        <>
            {posts.map(item =>
                <Post key={item._id.$oid} post={item} />
            )}
        </>
    );
}