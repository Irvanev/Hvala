import { collection, query, where, getDocs,orderBy, limit, startAfter, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";

export const fetchAdvertismentsSearch = async () => {
    const advertismentsCollection = collection(db, "advertisment");
    const q = query(
        advertismentsCollection,
        orderBy("time_creation", "desc")
    );
    const querySnapshot = await getDocs(q);
    const advertisments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return advertisments;
}

export const fetchAdvertisments = async (loadedAdvertisements) => {
    const advertismentsCollection = collection(db, "advertisment");
    const q = query(
        advertismentsCollection,
        orderBy("time_creation", "desc"),
        limit(loadedAdvertisements)
    );
    const querySnapshot = await getDocs(q);
    const advertisments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return advertisments;
}

export const fetchAdditionalAdvertisements = async (lastAdvertisementTime) => {
    const advertismentsCollection = collection(db, "advertisment");
    const q = query(
        advertismentsCollection,
        orderBy("time_creation", "desc"),
        limit(40),
        startAfter(lastAdvertisementTime[lastAdvertisementTime.length - 1].time_creation)
    );
    const querySnapshot = await getDocs(q);
    const additionalAdvertisements = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return additionalAdvertisements;
}


export const getConversionRate = async (currency) => {
    let conversionRate = null;

    if (currency === 'eur') {
        await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')
            .then(response => response.json())
            .then(data => conversionRate = data.eur.rsd);
    } else if (currency === 'rsd') {
        await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/rsd.json')
            .then(response => response.json())
            .then(data => conversionRate = data.rsd.eur);
    }

    return conversionRate;
}

export const fetchAdvertismentsByFilters = (
    category, subcategory, country, region, 
    condition, size, type, wheel, mileage, body, drive,
    year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency, setAdvertisment
) => {
    let conditions = [];

    if (category) conditions.push(where('category', '==', category));
    if (subcategory) conditions.push(where('subcategory', '==', subcategory));
    if (condition) conditions.push(where('condition', '==', condition));
    if (size) conditions.push(where('size', '==', size));
    if (brand) conditions.push(where('brand', '==', brand));
    if (memory) conditions.push(where('memory', '==', memory));
    if (screen_size) conditions.push(where('screen_size', '==', screen_size));
    if (type) conditions.push(where('type', '==', type));
    if (body) conditions.push(where('body', '==', body));
    if (drive) conditions.push(where('drive', '==', drive));
    if (mileage) conditions.push(where('mileage', '==', mileage));
    if (year) conditions.push(where('year', '==', year));
    if (wheel) conditions.push(where('wheel', '==', wheel));
    if (transmission) conditions.push(where('transmission', '==', transmission));
    if (country) conditions.push(where('country', '==', country));
    if (region) conditions.push(where('region', '==', region));
    if (currency) conditions.push(where('currency', '==', currency));
    if (minPrice) conditions.push(where('price', '>=', minPrice));
    if (maxPrice) conditions.push(where('price', '<=', maxPrice));

    const q = query(collection(db, 'advertisment'), ...conditions);

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const newAdvertisments = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        setAdvertisment(newAdvertisments);
    });

    return unsubscribe;
};