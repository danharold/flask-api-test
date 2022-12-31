import { useState, useEffect } from "react";
import { getPosts, getUserInfo } from '../services/util.js';
import {
    Card,
    Typography,
    CardBody,
    CardFooter
} from "@material-tailwind/react";

export default function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      getPosts().then(items => {
            setPosts(items)
      });
    },[])

    return (
        // <div className="">
        //     <ul>
        //     {posts.map(item => 
        //         <li className="mt-3" key={item.username}>
        //             {item.username} said: <br/>
        //             {item.body} <br/>
        //             on {item.timestamp.$date}
        //         </li>)}
        //     </ul>
        // </div>
        <div>
            {posts.map(item =>
                <Card className="my-10 bg-white order-radius-0 drop-shadow-md rounded-none">
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
        </div>
    );
}