import React from 'react';
import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faLaravel, faSymfony } from '@fortawesome/free-brands-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  return (
    <div className="pageContainer">
      <div className="aboutContainer">
        <h1>About Me</h1>
        <p>I am a web developer with a strong foundation in both front-end and back-end development, as well as experience in mobile app development. My technical expertise includes working with PHP, Laravel, Symfony, JavaScript, React, and React Native.
        </p><p>
          I prioritize efficiency and speed in my work, ensuring that I create user-friendly applications. While my experience includes a few freelance projects, I am eager to tackle new challenges and grow professionally.
        </p>
        <h2>Skills</h2>
        <ul className="skillsList">
          <li>
            <FontAwesomeIcon icon={faReact} className="icon" />
            React
          </li>
          <li>
            <FontAwesomeIcon icon={faMobileAlt} className="icon" />
            React Native
          </li>
          <li>
            <FontAwesomeIcon icon={faLaravel} className="icon" />
            Laravel
          </li>
          <li>
            <FontAwesomeIcon icon={faSymfony} className="icon" />
            Symfony
          </li>
        </ul>
      </div>
    </div>
  );
}
