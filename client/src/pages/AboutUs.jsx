import React from 'react'

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Your trusted source for insightful articles and the latest trends in technology.</p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>We are dedicated to providing readers with high-quality, engaging, and informative content about technology, web development, AI, cloud computing, and more. Our mission is to inspire, educate, and connect tech enthusiasts across the globe.</p>
        </div>
        
        <div className="about-section">
          <h2>What We Offer</h2>
          <p>Our blog covers a range of topics from software development to emerging trends in artificial intelligence. With a team of passionate writers and industry experts, we bring you insights that empower and inform, helping you stay ahead in the fast-paced tech world.</p>
        </div>
        
        <div className="about-section">
          <h2>Our Team</h2>
          <p>We are a group of tech enthusiasts, developers, and writers united by our love for technology. Our diverse backgrounds enable us to provide fresh perspectives on topics that matter. Whether you’re a beginner or a seasoned professional, we aim to deliver content that is valuable to everyone.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
