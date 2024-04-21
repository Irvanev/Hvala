import { db } from '../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const fetchAdvertismentsByCategory = (category, setAdvertisments, setIsLoading) => {
    const q = query(collection(db, 'advertisment'), where('category', '==', category));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const newAdvertisments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setAdvertisments(newAdvertisments);
        setIsLoading(false);
    });

    return unsubscribe;
};


export const fetchAdvertismentsBySubcategory = (category, subcategory, setAdvertisments, setIsLoading) => {
    const q = query(
        collection(db, 'advertisment'),
        where('category', '==', category),
        where('subcategory', '==', subcategory)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const newAdvertisments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setAdvertisments(newAdvertisments);
        setIsLoading(false);
    });

    return unsubscribe;
};

