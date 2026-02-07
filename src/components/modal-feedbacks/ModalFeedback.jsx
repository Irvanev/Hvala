import React, { useState } from 'react';
import { Modal, Button, Input, Rate } from 'antd';
import { useTranslation } from 'react-i18next';

const ReviewModal = ({ isModalVisible, handleCancel, feedbacks, submitReview }) => {
  const { t } = useTranslation();
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const toggleReviewForm = () => {
    setIsReviewFormVisible(!isReviewFormVisible);
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    submitReview(reviewText, rating);
    setReviewText('');
    setRating(0);
    setIsReviewFormVisible(false);
  };

  return (
    <Modal title={t('reviewsForProfile')} open={isModalVisible} onCancel={handleCancel} footer={null}>
      {feedbacks.map((feedback, index) => (
        <div key={index}>
          <h5 className='mt-3'>{new Date(feedback.time_creation?.seconds * 1000).toLocaleDateString()}</h5>
          <h5>{t('comment_from')} {feedback.userName}</h5>
          <p>{feedback.description} <Rate disabled defaultValue={feedback.rating} /></p>
        </div>
      ))}

      {!isReviewFormVisible && (
        <div className='d-flex justify-content-center'>
          <Button className='mt-3'
            style={{ backgroundColor: '#FFBF34', border: 'none', color: 'white' }} onClick={toggleReviewForm}>{t('set_feedback')}</Button>
        </div>
      )}

      {isReviewFormVisible && (
        <>
          <Input.TextArea
            className='mt-3'
            rows={4}
            value={reviewText}
            onChange={handleReviewChange}
            placeholder={t('input_feedback')}
          />
          <Rate className='mt-3' value={rating} onChange={handleRatingChange} />
          <div className='d-flex justify-content-center'>
            <Button className='mt-3'
              style={{ backgroundColor: '#FFBF34', border: 'none', color: 'white' }} onClick={handleSubmitReview}>{t('send_feedback')}</Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ReviewModal;