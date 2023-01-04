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


export default function Post({post, onDeletePost}) {

    function deletePost(event) {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('a'))
            ?.split('=')[1];

        axios.delete('/api/posts/'+post._id.$oid, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });
        
        //window.location.reload()
        onDeletePost(post._id.$oid)
    }

    return (
        <Card key={post._id.$oid} post_id={post._id.$oid} className="post my-10 bg-white order-radius-0 drop-shadow-md rounded-none">
            <CardBody className="">
                <Typography variant="h5" className="mb-2">
                    {post.username} said:
                </Typography>
                <Typography>
                    {post.body}
                </Typography>
            </CardBody>
            <IconButton ripple={false} variant="text" onClick={deletePost} value="DELETE" className="!absolute right-2 top-2 rounded-full text-lg text-color-black w-6 h-6">
                <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </IconButton>
            <CardFooter divider className="flex items-center justify-between py-3">
                <Typography variant="small" color="gray">
                    {post.timestamp.$date}
                </Typography>
            </CardFooter>
        </Card>
    );
}