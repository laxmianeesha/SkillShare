import React from 'react'
import Navbar from './navbar'
import '../styles/home.css'
import heroImg from '../assets/hero.png'

const Home = () => {
    return (
        <div className='home-container'>
            <Navbar />
            <div className='hero'>
                <div className='hero-content'>
                    <h1>Learn from Experts.
                        Share Your Skills.
                        Grow Together.</h1>
                    <p>Unlock your potential with personalized 1:1 mentorship from industry leaders. Join a global community of lifelong learners and professional mentors.</p>
                    <button className='hero-btn'>get started</button>
                </div>

                <div className='hero-img'>
                    <img src={heroImg} alt="Hero" />
                </div>

            </div>
            <section className="stats-section">
                <div className="stats-container">

                    <div className="stat-card">
                        <h2>10k+</h2>
                        <h4>Active Learners</h4>
                        <p>Growing every single day across the globe.</p>
                    </div>

                    <div className="stat-card">
                        <h2>500+</h2>
                        <h4>Expert Mentors</h4>
                        <p>Industry leaders from top global companies.</p>
                    </div>

                    <div className="stat-card highlight">
                        <h2>98%</h2>
                        <h4>Success Rate</h4>
                        <p>Students who achieved their learning goals.</p>
                    </div>

                </div>
            </section>
            {/* Testimonials */}
            <section className="testimonials">

                <div className="heading">
                    <h2>Voices from our Community</h2>
                    <p>Real stories from learners and mentors.</p>
                </div>

                <div className="testimonial-container">

                    <div className="testimonial-card">
                        <span className="quote">❝</span>
                        <p>
                            Finding a mentor who actually works at my dream company changed
                            everything. The feedback on my portfolio was direct and invaluable.
                        </p>

                        <div className="profile">
                            <img src="https://i.pravatar.cc/50?img=32" alt="Maya J." />
                            <div>
                                <h4>Maya J.</h4>
                                <span>UX Design Student</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <span class="quote">❝</span>
                        <p>
                            Being an instructor on SkillShare allows me to give back while
                            making a significant side income. The platform is seamless.
                        </p>

                        <div className="profile">
                            <img src="https://i.pravatar.cc/50?img=15" alt="Robert K." />
                            <div>
                                <h4>Robert K.</h4>
                                <span>Lead Dev Instructor</span>
                            </div>
                        </div>
                    </div>

                    <div className="testimonial-card">
                        <span class="quote">❝</span>
                        <p>
                            The 1:1 sessions are so much better than prerecorded videos. I
                            could ask specific questions about my project and get answers instantly.
                        </p>

                        <div className="profile">
                            <img src="https://i.pravatar.cc/50?img=12" alt="Sam T." />
                            <div>
                                <h4>Sam T.</h4>
                                <span>Marketing Professional</span>
                            </div>
                        </div>
                    </div>


                </div>

            </section>

            {/* CTA */}

            <section className="cta">

                <h1>Ready to teach what you love?</h1>

                <p>
                    Join thousands of experts worldwide. Share your experience, mentor the
                    next generation, and grow your personal brand.
                </p>

                <div className="cta-buttons">
                    <button className="primary">Become an Instructor</button>
                    <button className="secondary">Learn More</button>
                </div>

            </section>
        </div>
    )
}

export default Home;