import { collection, query, where, getDocs, updateDoc, deleteField, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { db, storage } from "../../config/firebase";
import imageCompression from 'browser-image-compression';

export const getUserByAuth = async (setUser) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        const userId = currentUser.uid;
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('id', '==', userId));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    } else {
        console.log("No user is signed in.");
    }
};

export const uploadBanner = async (file) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        const storageRef = ref(storage, `banners/${compressedFile.name}`);
        await uploadBytes(storageRef, compressedFile);
        const url = await getDownloadURL(storageRef);
        return url;
    } catch (error) {
        console.error('Ошибка при сжатии изображения:', error);
        throw error;
    }
};

export const uploadPhoto = async (file, userId) => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 600,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);
        const storageRef = ref(storage, `profilePhoto/${compressedFile.name}`);
        await uploadBytes(storageRef, compressedFile);
        const url = await getDownloadURL(storageRef);

        const usersCollection = collection(db, "users");
        const q = query(usersCollection, where("id", "==", userId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userDocRef = doc(usersCollection, userDoc.id);

            await updateDoc(userDocRef, { photoUrl: url });
        }

        return url;
    } catch (error) {
        console.error('Ошибка при сжатии изображения:', error);
        throw error;
    }
};

export const updateUserProfile = async (profileData) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const usersCollection = collection(db, "users");

        const q = query(usersCollection, where("id", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error("User not found.");
        }

        const currentUserData = querySnapshot.docs[0].data();

        if (profileData.name && profileData.name !== currentUserData.name) {
            const nameQuery = query(usersCollection, where("name", "==", profileData.name));
            const nameSnapshot = await getDocs(nameQuery);
            if (!nameSnapshot.empty) {
                throw new Error("Name is already taken.");
            }
        }

        if (profileData.link && profileData.link.trim() !== '' && profileData.link !== currentUserData.link) {
            const linkQuery = query(usersCollection, where("link", "==", profileData.link.trim()));
            const linkSnapshot = await getDocs(linkQuery);
            if (!linkSnapshot.empty) {
                throw new Error("Link is already taken.");
            }
        }

        const updatedData = {};
        updatedData.name = profileData.name ? profileData.name : deleteField();
        updatedData.description = profileData.description ? profileData.description : deleteField();
        updatedData.link = (profileData.link && profileData.link.trim() !== '') ? profileData.link.trim() : (currentUserData.id || user.uid);
        updatedData.phone = profileData.phone ? profileData.phone : deleteField();
        updatedData.emailProfile = profileData.emailProfile ? profileData.emailProfile : deleteField();
        updatedData.instagram = profileData.instagram ? profileData.instagram : deleteField();
        updatedData.site = profileData.site ? profileData.site : deleteField();
        updatedData.facebook = profileData.facebook ? profileData.facebook : deleteField();
        updatedData.bannerUrl = profileData.bannerUrl ? profileData.bannerUrl : deleteField();

        querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, updatedData);
        });
    }
};