import React from 'react';
import './Education.css';

const Education = () => {
    const education = [
        {
            title: 'Software University',
            image: require('../images/university-default.png'),
            description: 'I have completed the "PHP Web", "JS core" and "Tech Module 3.0" courses at Software University.'
        },

        {
            title: 'Freecodecamp',
            image: require('../images/freecodecamp.png'),
            description: 'I have completed the course "Front End Development Libraries", "Responsive Web Design" and "JavaScript Algorithms and Data Structures" on freecodecamp.org.'
        },

    ];

    return (
        <div className="pageContainer">
            <div className="eduContainer">
                <h1>Education</h1>
                <hr />

                <div className="row">
                    {education.map((project, index) => (
                        <div key={index} className="col-md-6">
                            <img src={project.image} alt={project.title} />

                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
