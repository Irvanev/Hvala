import { collection, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const fetchUser = async (userId) => {
    let user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('id', '==', userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            user = doc.data();
            localStorage.setItem('user', JSON.stringify(user));
        });
    }
    return user;
}

export const fetchReviews = async (userId) => {
    const feedbackRef = collection(db, 'feedback');
    const feedbackQuery = query(feedbackRef, where('to_uid', '==', userId));
    const feedbackSnapshot = await getDocs(feedbackQuery);
    const feedbackCount = feedbackSnapshot.size;

    const reviews = feedbackSnapshot.docs.map(doc => doc.data());
    return { reviews, feedbackCount };
}



export const fetchAdvertisements = async (userId) => {
    const advertisementRef = collection(db, 'advertisment');

    // Проверка наличия поля in_archive
    const checkFieldExists = async (field) => {
        const snapshot = await getDocs(advertisementRef);
        let fieldExists = false;
        snapshot.forEach(doc => {
            if (doc.data().hasOwnProperty(field)) {
                fieldExists = true;
            }
        });
        return fieldExists;
    };

    const fieldExists = await checkFieldExists('in_archive');
    let advertisementQuery;

    if (fieldExists) {
        advertisementQuery = query(advertisementRef, where('from_uid', '==', userId), where('in_archive', '==', false));
    } else {
        advertisementQuery = query(advertisementRef, where('from_uid', '==', userId));
    }

    const advertisementSnapshot = await getDocs(advertisementQuery);
    const advertisements = advertisementSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return advertisements;
};

export const fetchAdvertismentsArchive = async (userId) => {
    const advertisementRef = collection(db, 'advertisment');
    const advertisementQuery = query(advertisementRef, where('from_uid', '==', userId), where('in_archive', '==', true));
    const advertisementSnapshot = await getDocs(advertisementQuery);
    const advertisementsArchive = advertisementSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    return advertisementsArchive;
}

export const fetchUserAndReviews = async (userId) => {
    const user = await fetchUser(userId);
    const { reviews, feedbackCount } = await fetchReviews(userId);
    const advertisements = await fetchAdvertisements(userId);

    return { user: { ...user, reviewCount: feedbackCount }, reviews, advertisements };
}

export async function archivedAdvertisement(id) {
    const docRef = doc(db, "advertisment", id);

    try {
        await updateDoc(docRef, {
            in_archive: true
        });
        console.log(`Document with ID ${id} was archived!`);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function unarchivedAdvertisement(id) {
    const docRef = doc(db, "advertisment", id);

    try {
        await updateDoc(docRef, {
            in_archive: false
        });
        console.log(`Document with ID ${id} was unarchived!`);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}

export async function deleteAdvertisement(id) {
    const docRef = doc(db, "advertisment", id);

    try {
        await deleteDoc(docRef);
        console.log(`Document with ID ${id} was deleted!`);
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
}