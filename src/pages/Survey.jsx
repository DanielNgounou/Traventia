import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Survey() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <div className="container page-space confirmation"><div className="confirmation-icon">✓</div><h1>Thank you for your feedback!</h1><p>Your response helps us improve future journeys.</p><Link className="button primary" to="/">Return home</Link></div>;

  return (
    <div className="container page-space survey-wrap"><form className="survey-card" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><div className="survey-icon">♡</div><h1>We value your feedback!</h1><p>Thank you for shopping with Traventia. Please take a moment to share your experience.</p><hr /><label>1. How would you rate your shopping experience?</label><div className="stars">{[1,2,3,4,5].map((star) => <button type="button" key={star} className={star <= rating ? 'selected' : ''} onClick={() => setRating(star)}>★</button>)}</div><label>2. Would you recommend Traventia to others?</label><div className="recommend"><label><input type="radio" name="recommend" defaultChecked /> Yes</label><label><input type="radio" name="recommend" /> No</label></div><label>3. Do you have any suggestions? <span>(Optional)</span></label><textarea placeholder="Share your thoughts..." rows="5" /><button className="button primary wide" type="submit">Submit Feedback</button><small>Your feedback is anonymous and helps us improve.</small></form></div>
  );
}
