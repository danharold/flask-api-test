import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from './Post'

export default function PostList({posts, onDeletePost}) {
    return (
        <>
            {posts.map(item =>
                <Post key={item._id.$oid} post={item} onDeletePost={onDeletePost}/>
            )}
        </>
    );
}