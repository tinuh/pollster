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
  await db.collection(colName).doc(docId).get()
  .then(doc => {
    if (doc.exists) {
      return { ...doc.data(), id: docId };
    } else {
      return null;
    }
  });
}