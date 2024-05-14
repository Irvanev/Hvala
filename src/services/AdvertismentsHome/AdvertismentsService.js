import { collection, query, where, getDocs,orderBy, limit, startAfter } from "firebase/firestore";
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
        startAfter(lastAdvertisementTime)
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