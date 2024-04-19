import React, {useState, useEffect} from "react";
import {Modal, Button, Rate} from 'antd';
import {collection, query, where, getDocs} from "firebase/firestore";
import {db} from "../../config/firebase";
import {useTranslation} from 'react-i18next';

const ModalForNumberReports = ({handleClose, reviews, show}) => {
    const [userNames, setUserNames] = useState({});
    const [userRating, setUserRating] = useState({});
    const {t} = useTranslation();

    useEffect(() => {
        const fetchUserNames = async () => {
            const newNames = {};
            const newRating = {};
            for (const review of reviews) {
                const q = query(collection(db, "users"), where("id", "==", review.from_uid));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    newNames[review.from_uid] = doc.data().name;
                    newRating[review.from_uid] = doc.data().rating;
                });
            }
            setUserNames(newNames);
            setUserRating(newRating);
        };

        fetchUserNames();
    }, [reviews]);

    return (
        <Modal
            title={t('reviewsForProfile')}
            open={show}
            onCancel={handleClose}
            footer={[
                <Button key="back" onClick={handleClose}>
                    {t('close')}
                </Button>,
            ]}
        >
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id}>
                        <h5 className='mt-3'>{new Date(review.time_creation?.seconds * 1000).toLocaleDateString()}</h5>
                        <h5>Комментарий от {userNames[review.from_uid]}</h5>
                        <p>{review.description} <Rate disabled defaultValue={review.rating}/></p>
                    </div>
                ))
            ) : (
                <p>{t('noReviews')}</p>
            )}
        </Modal>
    );
}

export default ModalForNumberReports;