import React, {useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const ModalForNumberReports = ({handleClose, reviews, show}) => {
    const [userNames, setUserNames] = useState({});

    useEffect(() => {
        const fetchUserNames = async () => {
            const newNames = {};
            for (const review of reviews) {
                const q = query(collection(db, "users"), where("id", "==", review.from_uid));
                const querySnapshot = await getDocs(q);
    
                querySnapshot.forEach((doc) => {
                    newNames[review.from_uid] = doc.data().name; // Предполагается, что имя пользователя хранится в поле "name"
                });
            }
            setUserNames(newNames);
        };
    
        fetchUserNames();
    }, [reviews]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Отзывы</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id}>
                            <h5>{userNames[review.from_uid]}</h5>
                            <p>{review.description}</p>
                        </div>
                    ))
                ) : (
                    <p>Нет отзывов</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalForNumberReports;