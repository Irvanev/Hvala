import { doc, updateDoc, deleteDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { format, formatDistanceToNow } from 'date-fns';
import { ru, enUS, sr } from 'date-fns/locale';
import i18n from 'i18next';

export function formatDate(timestamp) {
    const locales = { ru, en: enUS, sr };
    const locale = locales[i18n.language] || enUS;

    const date = new Date(timestamp.seconds * 1000);
    const formattedDate = formatDistanceToNow(date, { addSuffix: true, locale });

    const today = new Date();
    const isToday = date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    if (isToday) {
        return format(date, 'HH:mm', { locale });
    } else if (formattedDate.includes('день')) {
        return `вчера ${format(date, 'HH:mm', { locale })}`;
    } else {
        return format(date, 'd MMMM HH:mm', { locale });
    }
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

export async function upAdvertisment(idAdv, showMessage) {
    const docRef = doc(db, "advertisment", idAdv);

    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const lastUpdate = data.time_creation.toDate();
            const now = new Date();
            console.log(lastUpdate, now);
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