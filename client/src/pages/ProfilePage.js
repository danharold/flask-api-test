import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Body from '../components/Body';
import PostList from '../components/posts/PostList';

import {
    Card,
    CardBody,
    Typography
} from '@material-tailwind/react';

import pfp from '../assets/defaultpfp.jpeg';

export default function ProfilePage({user}) {
    const { username } = useParams();
    const [pageUser, setPageUser] = useState(() => {
        return undefined;
    });
    const [pagePosts, setPagePosts] = useState(() => {
        return undefined;
    });

    const testPosts = [
        {
            "$oid": "63b746aebc9826a905f46c31"
        },
        {
            "$oid": "63b70be358ec1813ee3bb416"
        },
        {
            "$oid": "63b5a4791f34bfa87a2f2998"
        }
    ]

    //console.log("ProfilePage render: ")
    //console.log("user: "+ JSON.stringify(pageUser))
    //console.log("posts: "+ JSON.stringify(pagePosts))
    //console.log("testPosts: "+JSON.stringify(testPosts))

    useEffect(() => {
        axios.get('/api/users/' + username).then((res) => {
            setPageUser(res.data);
        })
        
        
    }, [username]);

    useEffect(() => {
        async function fetchPosts() {
            let posts = [];
            if(pageUser) {
                for(let i = 0; i < pageUser.posts.length; i++) {
                    console.log(pageUser.posts[i].$oid)
                    const post = await axios.get('/api/posts/'+pageUser.posts[i].$oid);
                    if (post.data) {
                        posts.push(post.data);
                    }
                }
            }
            console.log(posts);
            setPagePosts(posts);
        }
        fetchPosts();
    }, [pageUser]);

    return (
        <Body>
            {pageUser ? <Card className=''>
                <CardBody>
                    <div className="flex flex-grow items-center">
                        <img src={pfp} alt="profile" className="bg-gray-300 rounded-md w-20 float-left"/>
                        <div className="ml-4">
                            <h1 className="mb-0 text-3xl text-black font-sans">
                                {pageUser.display_username}
                            </h1>
                            <p className="mt-0 text-gray-600">
                                @{pageUser.username}
                            </p>
                        </div>
                    </div>
                    <Typography className="mt-4">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                    </Typography>
                </CardBody>
            </Card>
            : <h1>Loading User</h1>}
            {pagePosts ? <PostList posts={pagePosts}/> : <h1>Loading posts</h1>}
        </Body>
    )
}