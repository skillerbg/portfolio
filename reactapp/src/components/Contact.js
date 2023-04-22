import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    console.log(process.env.REACT_APP_EMAILJS_USER_ID);
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        result => {
          console.log(result.text);
          alert('Your message has been sent successfully!');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        },
        error => {
          console.log(error.text);
          alert('An error occurred while sending your message.');
        }
      );
  };

  return (
    <div className="pageContainer">
      <div className="contactContainer">
        <h1>Contact</h1>

        <form onSubmit={handleSubmit} className="contactForm">
          <div className="formGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
