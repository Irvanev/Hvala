import { collection, query, getDocs, orderBy, limit, startAfter, where } from "firebase/firestore";
import { db } from "../../config/firebase";

import Resizer from "react-image-file-resizer";

export const fetchAdvertisments = async (
    lastVisible, category, subcategory, country, region, 
    condition, size, type, wheel, mileage, body, drive,
    year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency
) => {
    const advertismentsCollection = collection(db, "advertisment");
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

    let q;

    if (lastVisible) {
        q = query(
            advertismentsCollection,
            orderBy("time_creation", "desc"),
            where("in_archive", "==", false),
            ...conditions,
            startAfter(lastVisible),
            limit(20)
        );
    } else {
        q = query(
            advertismentsCollection,
            orderBy("time_creation", "desc"),
            where("in_archive", "==", false),
            ...conditions,
            limit(20)
        );
    }

    const querySnapshot = await getDocs(q);
    const advertisments = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

    return { advertisments, lastDoc };
}

export const resizeImageFromUrl = async (url) => {
    const blob = await fetch(url).then(res => res.blob());
    
    if (!blob.type.startsWith("image/")) {
        return url;
    }

    return new Promise((resolve) => {
        Resizer.imageFileResizer(
            blob,
            300,
            300,
            "WEBP",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });
};