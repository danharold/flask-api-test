import React, { useState, useEffect } from "react";
import axios from "axios";

import Post from './Post'

export default function PostList({posts}) {
    return (
        <>
            {posts.map(item =>
                <Post key={item._id.$oid} post={item} />
            )}
        </>
    );
}