import React from 'react';
import './Blog.css';
const blogData = [
    {
      id: 1,
      title: 'Blog Post 1',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: 'March 1, 2023',
      image: 'https://via.placeholder.com/200x150',
    },
    {
      id: 2,
      title: 'Blog Post 2',
      summary: 'Praesent aliquam, nisi id tempor congue, nibh nulla malesuada ante, at lacinia lorem quam sed odio.',
      date: 'March 5, 2023',
      image: 'https://via.placeholder.com/200x150',
    },
    {
      id: 3,
      title: 'Blog Post 3',
      summary: 'Fusce convallis ante nec tellus dictum, sit amet suscipit urna commodo.',
      date: 'March 10, 2023',
      image: 'https://via.placeholder.com/200x150',
    },
  ];
const Blog = () => {
  return (
    <div className='pageContainer'>
      <div className='blogContainer'>
      <h1>Blog</h1>
        <hr />
      {blogData.map((blog) => (
        <div key={blog.id} className="blog-card">
          <img src={blog.image} alt={blog.title} className="blog-image" />
          <div className="blog-details">
            <h2>{blog.title}</h2>
            <p>{blog.summary}</p>
            <div className="blog-date">{blog.date}</div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Blog;
