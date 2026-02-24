import { collection, query, where, getDocs, orderBy, limit, startAfter, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { expandSearchTerms } from "../searchDictionary";

// Строит conditions для фильтров (как в test.js)
const buildFilterConditions = (filters) => {
    const conditions = [];
    if (!filters) return conditions;
    const {
        category, subcategory, country, region, condition, size, type,
        wheel, mileage, body, drive, year, transmission, memory, screen_size,
        brand, minPrice, maxPrice, currency
    } = filters;
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
    return conditions;
};

// Фильтрация результатов по in_archive и filters на клиенте (чтобы не требовать составные индексы Firestore)
const filterResults = (docs, filters) => {
    let result = docs.filter(doc => doc.in_archive !== true);
    if (!filters) return result;
    const { category, subcategory, country, region, condition, size, type, wheel, mileage, body, drive, year, transmission, memory, screen_size, brand, minPrice, maxPrice, currency } = filters;
    if (category) result = result.filter(d => d.category === category);
    if (subcategory) result = result.filter(d => d.subcategory === subcategory);
    if (country) result = result.filter(d => d.country === country);
    if (region) result = result.filter(d => d.region === region);
    if (condition) result = result.filter(d => d.condition === condition);
    if (size) result = result.filter(d => d.size === size);
    if (type) result = result.filter(d => d.type === type);
    if (wheel) result = result.filter(d => d.wheel === wheel);
    if (mileage) result = result.filter(d => d.mileage === mileage);
    if (body) result = result.filter(d => d.body === body);
    if (drive) result = result.filter(d => d.drive === drive);
    if (year) result = result.filter(d => d.year === year);
    if (transmission) result = result.filter(d => d.transmission === transmission);
    if (memory) result = result.filter(d => d.memory === memory);
    if (screen_size) result = result.filter(d => d.screen_size === screen_size);
    if (brand) result = result.filter(d => d.brand === brand);
    if (currency) result = result.filter(d => d.currency === currency);
    if (minPrice != null && minPrice !== "") result = result.filter(d => (d.price ?? 0) >= minPrice);
    if (maxPrice != null && maxPrice !== "") result = result.filter(d => (d.price ?? 0) <= maxPrice);
    return result;
};

// Загрузка объявлений по фильтрам из Firestore (для поиска «слово в названии»)
const fetchByFilters = async (filters, limitCount = 300) => {
    const baseConditions = [where("in_archive", "==", false), ...buildFilterConditions(filters)];
    const q = query(
        collection(db, "advertisment"),
        ...baseConditions,
        orderBy("time_creation", "desc"),
        limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
};

// Проверка, что название содержит хотя бы один из вариантов поиска (мультиязычный словарь)
const titleMatchesAny = (titleNorm, searchTerms) => {
    if (!titleNorm || !searchTerms?.length) return false;
    return searchTerms.some((term) => titleNorm.includes(term));
};

// Поиск объявлений для главной страницы.
// Если searchText пустой — последние объявления (с in_archive и filters через Firestore).
// Если есть текст — 1) префикс (название начинается с запроса), 2) вхождение (слово есть в названии).
export const fetchAdvertismentsSearch = async (searchText = "", filters = null) => {
    const advertismentsCollection = collection(db, "advertisment");
    const trimmed = (searchText || "").toLowerCase().trim();

    if (!trimmed) {
        const baseConditions = [where("in_archive", "==", false), ...buildFilterConditions(filters)];
        const q = query(
            advertismentsCollection,
            ...baseConditions,
            orderBy("time_creation", "desc"),
            limit(40)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    }

    const prefixIds = new Set();
    const searchTermsExpanded = expandSearchTerms(trimmed);

    // 1. Префикс: для каждого варианта из словаря — запрос «начинается с» (макс. 5 терминов, чтобы не перегружать Firestore)
    const prefixResults = [];
    const termsForPrefix = searchTermsExpanded.slice(0, 5);
    for (const term of termsForPrefix) {
        const end = term + '\uf8ff';
        const prefixQ = query(
            advertismentsCollection,
            where("title_normalized", ">=", term),
            where("title_normalized", "<=", end),
            orderBy("title_normalized"),
            limit(40)
        );
        const prefixSnapshot = await getDocs(prefixQ);
        const prefixRaw = prefixSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const filtered = filterResults(prefixRaw, filters);
        for (const ad of filtered) {
            if (!prefixIds.has(ad.id)) {
                prefixIds.add(ad.id);
                prefixResults.push(ad);
            }
        }
    }

    // 2. Вхождение: слово (или его эквивалент) есть в названии — загружаем по фильтрам и фильтруем на клиенте
    const byFilters = await fetchByFilters(filters, 400);
    const containsFiltered = filterResults(byFilters, filters).filter(d =>
        titleMatchesAny(d.title_normalized, searchTermsExpanded) && !prefixIds.has(d.id)
    );

    // 3. Объединяем: сначала префикс, потом вхождение, до 40
    const merged = [...prefixResults];
    for (const ad of containsFiltered) {
        if (merged.length >= 40) break;
        merged.push(ad);
    }
    return merged.slice(0, 40);
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