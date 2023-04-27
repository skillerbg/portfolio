import React from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import blogData from '../blogData';

import './Post.css';

  
const Post = () => {
    const { id } = useParams();
    const data = blogData.find((blog) => blog.id === parseInt(id));
  return (
    <div className='pageContainer'>
      <div className='postContainer'>
      <h1>{data.title}</h1>
        <hr />
        <h4>{data.date}</h4>
        <hr />
        <p>{data.content}</p>

      </div>
    </div>
  );
};

export default Post;
