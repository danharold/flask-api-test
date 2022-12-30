import { useState, useEffect } from "react";
import { getPosts } from '../services/post.js';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      getPosts().then(items => {
            setPosts(items)
      });
    },[])

    return (
        <div>
            <h1 className="text-3xl">Posts</h1>
            <ul>
            {posts.map(item => <li key={item.username}>{item.username}: {item.body}</li>)}
            </ul>
        </div>
    );
}