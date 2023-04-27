import React from 'react';
import { Link, Route, useParams } from 'react-router-dom';
import blogData from '../blogData';

import './Blog.css';

const Blog = () => {
  return (
    <div className='pageContainer'>
      <div className='blogContainer'>
        <h1>Blog</h1>
        <hr />
        {blogData.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id} className="blog-card-link">
            <div className="blog-card">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <div className="blog-details">
                <h2>{blog.title}</h2>
                <p>{blog.summary}</p>
                <div className="blog-date">{blog.date}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
