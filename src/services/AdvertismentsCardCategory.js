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

export const fetchAdvertismentsByFilters = (
    category, subcategory, country, region, 
    condition, size, type, wheel, mileage, body, drive,
    year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency, setAdvertisments
) => {
    let q = query(
        collection(db, 'advertisment'),
    );

    if (category) {
        q = query(q, where('category', '==', category))
    }

    if (subcategory) {
        q = query(q, where('subcategory', '==', subcategory))
    }

    if (condition) {
        q = query(q, where('condition', '==', condition));
    }

    if (size) {
        q = query(q, where('size', '==', size));
    }

    if (brand) {
        q = query(q, where('brand', '==', brand));
    }

    if (memory) {
        q = query(q, where('memory', '==', memory));
    }

    if (screen_size) {
        q = query(q, where('screen_size', '==', screen_size));
    }

    if (type) {
        q = query(q, where('type', '==', type));
    }

    if (body) {
        q = query(q, where('body', '==', body));
    }

    if (drive) {
        q = query(q, where('drive', '==', drive));
    }

    if (mileage) {
        q = query(q, where('mileage', '==', mileage));
    }

    if (year) {
        q = query(q, where('year', '==', year));
    }

    if (wheel) {
        q = query(q, where('wheel', '==', wheel));
    }

    if (transmission) {
        q = query(q, where('transmission', '==', transmission));
    }

    if (country) {
        q = query(q, where('country', '==', country));
    }

    if (region) {
        q = query(q, where('region', '==', region));
    }

    if (currency) {
        q = query(q, where('currency', '==', currency));
    }

    if (minPrice) {
        q = query(q, where('price', '>=', minPrice));
    }

    if (maxPrice) {
        q = query(q, where('price', '<=', maxPrice));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const newAdvertisments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setAdvertisments(newAdvertisments);
    });

    return unsubscribe;
};
