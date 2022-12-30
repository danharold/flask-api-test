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
        <div className="">
            <ul>
            {posts.map(item => <li className="mt-3" key={item.username}>
                {item.username} said: <br/>
                {item.body} <br/>
                on {item.timestamp.$date}
            </li>)}
            </ul>
        </div>
    );
}