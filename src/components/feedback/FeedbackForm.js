import React, { useState, useContext, useEffect } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import Header from './Header';
import FeedbackContext from '..//../context/FeedbackContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'


function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const { addFeedback, feedbackEdit, updateFeedback, setFeedbackEdit } =
    useContext(FeedbackContext);

    const navigate = useNavigate()
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('text must be at least 10 characters');
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        id: feedbackEdit.item.id,
        text,
        rating,
      };
      try {
        if (feedbackEdit.edit === true) {
          await updateFeedback(feedbackEdit.item.id, newFeedback);
          setFeedbackEdit({ item: {}, edit: false });
        } else {
          await addFeedback(newFeedback);
        }
        setText('');
        toast.success('Feedback added successfully');

        const payload = {
          rating,
          text,
        };
        await axios.post('/api/fditems/addfditem', payload);
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong while saving the feedback');
      }
    }
  };
  

  return (
    <div className='className={styles.container}'>
      <Header />
      <Card>
        <form action='' onSubmit={handleSubmit}>
          <h2> how would you rate your service with us </h2>
          <RatingSelect select={(rating) => setRating(rating)} />
          <div className='input-group'>
            <input
              type='text'
              onChange={handleTextChange}
              placeholder='write a review'
              value={text}
            />
            <Button type='submit' isDisabled={btnDisabled}>
              send
            </Button>
          </div>
          {message && <p className='error'>{message}</p>}
        </form>
      </Card>
    </div>
  );
}

export default FeedbackForm;
