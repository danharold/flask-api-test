import Body from '../components/Body'
import PostList from '../components/posts/PostList'
import CreatePostForm from '../forms/CreatePostForm';

import axios from 'axios';
import { useState, useEffect } from 'react';

export default function HomePage() {
    const [value, setValue]= useState(0);
    const [posts, setPosts] = useState(() => {
        return [];
    });

    // console.log("RENDER");
    // console.log("POSTS: " + JSON.stringify(posts))

    useEffect(() => {
        axios.get('/api/posts').then((response) => {
            setPosts(response.data)
        });
        // console.log("GET POSTS");
        // console.log("POSTS: " + JSON.stringify(posts));
    }, []);

    function updateNewPost(newPost) {
        // console.log("UPDATE NEW POST");
        // console.log("POSTS: " + JSON.stringify(posts))
        // console.log("NEW POST: " + JSON.stringify(newPost))
        setPosts([newPost, ...posts])
    }

    return (
        <Body>
            <CreatePostForm 
                onNewPost={updateNewPost}
            />
            <PostList posts={posts}/>
        </Body>
    )
}