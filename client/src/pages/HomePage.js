import Body from '../components/Body'
import PostList from '../components/posts/PostList'
import CreatePostForm from '../forms/CreatePostForm';

import axios from 'axios';
import { useState, useEffect } from 'react';

export default function HomePage({user}) {
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

    function updateNewPost(new_post) {
        // console.log("UPDATE NEW POST");
        // console.log("POSTS: " + JSON.stringify(posts))
        // console.log("NEW POST: " + JSON.stringify(newPost))
        setPosts([new_post, ...posts])
    }

    function updateDeletePost(post_id) {
        // console.log("DELETE POST " + post_id)
        // console.log("POSTS: " + JSON.stringify(posts))
        // console.log("POST TO DELETE: " + JSON.stringify(
        //     posts.find((post) => post._id.$oid === post_id)
        // ))
        setPosts(p => p.filter((post) => {
            return post._id.$oid !== post_id
        }))
    }

    return (
        <Body>
            {user && <CreatePostForm 
                onNewPost={updateNewPost}
            />}
            <PostList posts={posts} onDeletePost={updateDeletePost} />
        </Body>
    )
}