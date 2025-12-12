const About = () => {
    return (
    <div className='page'>
            <button onClick={() => window.history.back()} style={{width: '80px'}}>Back</button> 

            <div className="headerinfo">
                <h1>About Vt Gov Tracker</h1>
            </div>

            <div className='about-content'>
                <p>
                    Vt Gov Tracker is an open-source project aimed at increasing transparency and accessibility of Vermont government meetings.
                    It provides a platform for citizens to easily access meeting information, discussed items, public comments, and attendees.
                </p>
                <p>
                    The project is built using modern web technologies including React for the frontend and Node.js for the backend.
                    Data is sourced from public APIs/Documents to ensure accuracy and reliability.
                </p>
                <p>
                    We believe that an informed citizenry is essential for a healthy democracy, and we are committed to making government proceedings more accessible to everyone.
                </p>
            </div>

            <div className="whoweare">
                <h2>Built By</h2>
                <div className="team-members">
                    <div className="team-member">
                        <h3>Caleb Laroche</h3>
                        <p>Full-Stack Developer</p>
                        <div className="aboutlinks">
                            <a className='aboutlink' href="https://github.com/caleblaroche14" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a className='aboutlink' href="https://www.linkedin.com/in/caleb-laroche-7a682a188/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a className='aboutlink' href="https://docs.google.com/document/d/1cqg9g0xTBNOdZd_rWMdgXMMh3AywDe9TQdig5-cBg58/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Resume</a>
                        </div>
                        <img src="https://avatars.githubusercontent.com/u/69857383?v=4" alt="Caleb Laroche" />
                    </div>
                    <div className="team-member">
                        <h3>Olivia Thayer</h3>
                        <p>Designer / Marketing</p>
                    </div>
                </div>
            </div>
    </div>
    );
}

export default About;