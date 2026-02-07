import { db } from '../config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export const fetchAdvertismentsByCategory = (category, setAdvertisments, setIsLoading) => {
    const q = query(
        collection(db, 'advertisment'),
        where('category', '==', category),
        where('in_archive', '==', false)
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

/** Строит базовый запрос без фильтров size_eu / size_us (для OR-логики размеров) */
function buildBaseQuery(
    category, subcategory, country, region,
    condition, size, type, seasonality, shoe_type, employment_type, work_sphere, experience_min, wheel, mileage, body, drive,
    year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency
) {
    let q = query(
        collection(db, 'advertisment'),
        where('in_archive', '==', false)
    );
    if (category) q = query(q, where('category', '==', category));
    if (subcategory) q = query(q, where('subcategory', '==', subcategory));
    if (condition) q = query(q, where('condition', '==', condition));
    if (size) q = query(q, where('size', '==', size));
    if (brand) q = query(q, where('brand', '==', brand));
    if (memory) q = query(q, where('memory', '==', memory));
    if (screen_size) q = query(q, where('screen_size', '==', screen_size));
    if (type) q = query(q, where('type', '==', type));
    if (seasonality) q = query(q, where('seasonality', '==', seasonality));
    if (shoe_type) q = query(q, where('shoe_type', '==', shoe_type));
    if (employment_type) q = query(q, where('employment_type', '==', employment_type));
    if (work_sphere) q = query(q, where('work_sphere', '==', work_sphere));
    if (experience_min !== undefined && experience_min !== '' && subcategory === 'vacancies') q = query(q, where('experience_required', '>=', Number(experience_min)));
    if (experience_min !== undefined && experience_min !== '' && subcategory === 'resumes') q = query(q, where('experience_years', '>=', Number(experience_min)));
    if (body) q = query(q, where('body', '==', body));
    if (drive) q = query(q, where('drive', '==', drive));
    if (mileage) q = query(q, where('mileage', '==', mileage));
    if (year) q = query(q, where('year', '==', year));
    if (wheel) q = query(q, where('wheel', '==', wheel));
    if (transmission) q = query(q, where('transmission', '==', transmission));
    if (country) q = query(q, where('country', '==', country));
    if (region) q = query(q, where('region', '==', region));
    if (currency) q = query(q, where('currency', '==', currency));
    if (minPrice) q = query(q, where('price', '>=', minPrice));
    if (maxPrice) q = query(q, where('price', '<=', maxPrice));
    return q;
}

export const fetchAdvertismentsByFilters = (
    category, subcategory, country, region,
    condition, size, type, seasonality, shoe_type, size_eu, size_us, employment_type, work_sphere, experience_min, wheel, mileage, body, drive,
    year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency, setAdvertisments
) => {
    const hasSizeEu = !!size_eu;
    const hasSizeUs = !!size_us;
    const sizeOrMode = hasSizeEu && hasSizeUs;

    if (sizeOrMode) {
        const baseQ = buildBaseQuery(
            category, subcategory, country, region,
            condition, size, type, seasonality, shoe_type, employment_type, work_sphere, experience_min, wheel, mileage, body, drive,
            year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency
        );
        const qEu = query(baseQ, where('size_eu', '==', size_eu));
        const qUs = query(baseQ, where('size_us', '==', size_us));
        const byId = new Map();
        const flush = () => {
            setAdvertisments(Array.from(byId.values()));
        };
        const unsubEu = onSnapshot(qEu, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                byId.set(doc.id, { id: doc.id, ...doc.data() });
            });
            flush();
        });
        const unsubUs = onSnapshot(qUs, (snapshot) => {
            snapshot.docs.forEach((doc) => {
                byId.set(doc.id, { id: doc.id, ...doc.data() });
            });
            flush();
        });
        return () => {
            unsubEu();
            unsubUs();
        };
    }

    let q = buildBaseQuery(
        category, subcategory, country, region,
        condition, size, type, seasonality, shoe_type, employment_type, work_sphere, experience_min, wheel, mileage, body, drive,
        year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency
    );
    if (hasSizeEu) q = query(q, where('size_eu', '==', size_eu));
    if (hasSizeUs) q = query(q, where('size_us', '==', size_us));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const newAdvertisments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setAdvertisments(newAdvertisments);
    });
    return unsubscribe;
};
