import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackPage.css';

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send feedback to the back-end API
      const response = await axios.post('http://localhost:5000/api/send-feedback', {
        feedback,
        email,
      });
      alert(response.data.message);
      setFeedback('');
      setEmail('');
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Failed to send feedback. Please try again later.');
    }
  };

  return (
    <div className="feedback-page">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="We value your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackPage;
