import { useState, useEffect } from "react";
import { getPosts } from '../services/post.js';

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      let mounted = true;
      getPosts().then(items => {
        if(mounted) {
            setPosts(items)
        }
      })
      return () => mounted = false;
    },[])

    return (
        <div>
            <h1 className="text-3xl">Posts</h1>
            {/* <p>{posts}</p>> */}
            <ul>
                {posts.map(item => <li key={posts.username}>{posts._id}</li>)}
            </ul>
            <p>{posts}</p>
        </div>
    );
}