import { collection, query, where, getDocs, getDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

export const fetchUserProfile = async (setUser, setLoading) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("id", "==", currentUser.uid));
        
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            console.error("Error fetching user profile: ", error);
        } finally {
            setLoading(false);
        }
    } else {
        console.log("No user is signed in.");
        setLoading(false);
    }
};

export const fetchUserAdvertisment = async (setAdvertisment, setLoading) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        const adsCollection = collection(db, "advertisment");
        const q = query(adsCollection, where("from_uid", "==", currentUser.uid), where("in_archive", "==", false));
        
        try {
            const querySnapshot = await getDocs(q);
            const ads = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setAdvertisment(ads);
        } catch (error) {
            console.error("Error fetching user ads: ", error);
        } finally {
            setLoading(false);
        }
    } else {
        console.log("No user is signed in.");
        setLoading(false);
    }
};

export const fetchUserAdvertismentArchive = async (setAdvertismentArchive, setLoading) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        const adsCollection = collection(db, "advertisment");
        const q = query(adsCollection, where("from_uid", "==", currentUser.uid), where("in_archive", "==", true));
        
        try {
            const querySnapshot = await getDocs(q);
            const ads = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setAdvertismentArchive(ads);
        } catch (error) {
            console.error("Error fetching user ads: ", error);
        } finally {
            setLoading(false);
        }
    } else {
        console.log("No user is signed in.");
        setLoading(false);
    }
};

export const fetchUserFeedback = async (setFeedback, setLoading) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        const feedbackCollection = collection(db, "feedback");
        const q = query(feedbackCollection, where("to_uid", "==", currentUser.uid));
        
        try {
            const querySnapshot = await getDocs(q);
            const feedbacks = [];
            const userPromises = [];

            querySnapshot.forEach((doc) => {
                const feedbackData = doc.data();
                feedbacks.push(feedbackData);

                const userQuery = query(collection(db, "users"), where("id", "==", feedbackData.from_uid));
                userPromises.push(getDocs(userQuery));
            });

            const userDocsSnapshots = await Promise.all(userPromises);

            userDocsSnapshots.forEach((userDocSnapshot, index) => {
                if (!userDocSnapshot.empty) {
                    feedbacks[index].fromUser = userDocSnapshot.docs[0].data();
                }
            });

            setFeedback(feedbacks);
        } catch (error) {
            console.error("Error fetching user feedback: ", error);
        } finally {
            setLoading(false);
        }
    } else {
        console.log("No user is signed in.");
        setLoading(false);
    }
};

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

export async function upAdvertisment(id, showMessage) {
    const docRef = doc(db, "advertisment", id);

    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const lastUpdate = data.time_creation.toDate();
            const now = new Date();
            const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;

            if (now - lastUpdate >= oneWeekInMillis) {
                await updateDoc(docRef, {
                    time_creation: serverTimestamp()
                });
                showMessage.success('up_success');
            } else {
                showMessage.error('up_error');
            }
        } else {
            showMessage.error("No such document!");
        }
    } catch (e) {
        showMessage.error("Error updating document: " + e.message);
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