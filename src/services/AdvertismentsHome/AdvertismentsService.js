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

export const fetchAdvertisementsByPrice = async (order = "asc") => {
    const advertismentsCollection = collection(db, "advertisment");
    const q = query(
        advertismentsCollection,
        orderBy("price", order)
    );
    const querySnapshot = await getDocs(q);
    const advertisments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    return advertisments;
}

export const fetchAdvertismentsByFilters = (
    category, subcategory, country, region, 
    condition, size, type, wheel, mileage, body, drive,
    year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency, setAdvertisment
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

        setAdvertisment(newAdvertisments);
    });

    return unsubscribe;
};