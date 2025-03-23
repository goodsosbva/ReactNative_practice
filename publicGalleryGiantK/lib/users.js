import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

export const usersCollection = firestore().collection('users');

export function createUser({id, displayName, photoURL}) {
    return usersCollection.doc(id).set({
        id,
        displayName,
        photoURL,
    });
}

export async function getUser(id) {
    const doc = await usersCollection.doc(id).get();
    return doc.data();
}

export function subscribeAuth(callback) {
    return auth().onAuthStateChanged(callback);
}
