import { 
  collection, 
  doc, 
  setDoc,
  getDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { db } from '../firebase';

// Collection name is constant
const COLLECTION_NAME = 'users';

// Add new user data (usually using the user's Auth UID as the document ID)
export const addUserData = async (userId, data) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    // setDoc with merge: true will create the document if it doesn't exist, or update it if it does
    await setDoc(docRef, data, { merge: true });
    return { id: userId, ...data };
  } catch (error) {
    console.error("Error in addUserData:", error);
    throw error;
  }
};

// Get specific user data by ID
export const getUserData = async (userId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error in getUserData:", error);
    throw error;
  }
};

// Update specific user data
export const updateUserData = async (userId, data) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(docRef, data);
    return { id: userId, ...data };
  } catch (error) {
    console.error("Error in updateUserData:", error);
    throw error;
  }
};

// Delete user data
export const deleteUserData = async (userId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, userId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error in deleteUserData:", error);
    throw error;
  }
};
