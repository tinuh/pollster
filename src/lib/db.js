import initFirebase from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

initFirebase();
const db = firebase.firestore();

// Adds a document to a collection
// Returns new document ref
export const addDoc = async (colName, docData, docId) => {
  var newDocRef;
  if (docId) { // If docId is provided
    newDocRef = await db.collection(colName).doc(docId).set(docData)
    .catch((err) => {
      // Error
    });
  } else {
    newDocRef = await db.collection(colName).add(docData);
  }
  return newDocRef;
}

// Fetches a document from a collection
export const getDoc = async (colName, docId) => {
  const doc = await db.collection(colName).doc(docId).get();
  if (doc.exists) {
    return { ...doc.data(), id: docId };
  } else {
    return null;
  }
}

export const getUserRef = async (userId) => {
  const userRef = await db.collection("users").doc(userId);
  return userRef;
}

export const getUserDocs = async (colName, userId) => {
  const userRef = await getUserRef(userId);
  const snapshot = await db.collection(colName).where('author', '==', userRef).get();
  if (snapshot.empty) {
    return [];
  }

  var docs = [];
  snapshot.forEach(doc => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
}