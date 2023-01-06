import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Body from '../components/Body';
import PostList from '../components/posts/PostList';
import ProfileCard from '../components/profile/ProfileCard';

export default function ProfilePage({user}) {
    const { username } = useParams();
    const [pageUser, setPageUser] = useState(() => {
        return undefined;
    });
    const [pagePosts, setPagePosts] = useState(() => {
        return undefined;
    });

    useEffect(() => {
        axios.get('/api/users/' + username).then((res) => {
            setPageUser(res.data);
        })
    }, [username]);

    useEffect(() => {
        axios.get('/api/posts', {
            headers: {
                "username": username
            }
        }).then((res) => {
            console.log(res)
            setPagePosts(res.data)
        }).catch((error) => {
            console.log(error)
        })

    }, [pageUser]);

    function updateDeletePost(post_id) {
        setPagePosts(p => p.filter((post) => {
            return post._id.$oid !== post_id
        }))
    }

    return (
        <Body>
            {pageUser ? <ProfileCard pageUser={pageUser}/> : <h1>Loading User</h1>}
            {pagePosts ? <PostList posts={pagePosts} onDeletePost={updateDeletePost}/> : <h1>Loading posts</h1>}
        </Body>
    )
}