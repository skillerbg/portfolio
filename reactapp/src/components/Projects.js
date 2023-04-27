import React from 'react';
import '../App.css';
import './Projects.css';
const Projects = () => {
    const projects = [
        {
            title: 'Beron AI',
            image: require('../images/beronai-logo.png'),
            description: 'Beron AI is an AI-based question answering app that is optimized to understand the Bulgarian language. Allows users to ask a wide range of questions in Bulgarian in text or voice form.',
            url: 'https://play.google.com/store/apps/details?id=com.beronai'
        } ,
        {
            title: 'CallGPT',
            image: require('../images/callgpt_logo.png'),
            description: `CallGPT is a browser extension that allows you to mimic a real voice conversation with OpenAI's GPT-4/GPT-3.5-turbo. By providing your OpenAI API key, you can engage in a voice call experience with an AI right from your browser. Your API key is securely stored in your browser's storage and is not accessible by anyone else.`,
            url: 'https://github.com/skillerbg/callgpt'
        },
        {
            title: 'BotMingle',
            image: require('../images/botminglelogo-square.png'),
            description: `Comming soon.`,
            url: 'http://botmingle.com'
        },

        {
            title: 'Nutrition planner',
            image: require('../images/nutritionLogo.png')
            , description: 'This web application helps users create personalized diet plans by selecting their daily calorie intake and budget. Users can add their own recipes to the shared database, including ingredient nutritional values and costs, which the app uses to calculate each recipe\'s nutritional and financial information.'
            , url: 'https://github.com/skillerbg/Nutrition'
        },
        {
            title: 'Brand ratings',
            image: require('../images/brandRatingsLogo.png'),
            description: 'This is a web-based platform that enables users to compose reviews about multiple brands. The brands can be sorted and evaluated using various criteria, such as the reviewer\'s gender, age, education, employment status, and more. Additionally, users have the option to suggest new brands to the platform.',
            url: 'https://github.com/skillerbg/Brands'
        },
       
     ];

    return (<div className="pageContainer">

        <div className="projectsContainer">
            <h1>Projects</h1>
            <hr />

            <div className="row">
                {projects.map((project, index) => (

                    <div key={index} className="col-md-6">
                        <a
                            href={project.url}
                            target='_blank'

                        >
                            <img src={project.image} alt={project.title} />

                            <h3>{project.title}</h3>
                            <p>{project.description}</p>

                        </a>


                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default Projects;
