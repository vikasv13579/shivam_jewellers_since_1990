/**
 * Firestore Helper Functions
 *
 * Uncomment and use these functions to easily save and retrieve contact form submissions
 * from Firebase Firestore.
 *
 * Setup:
 * 1. Make sure Firebase is initialized in src/lib/firebase.js
 * 2. Add Firestore initialization: export const db = getFirestore(app);
 * 3. Import these functions in your API route or components
 */

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  limit as firestoreLimit,
  deleteDoc,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { app } from './firebase';

// Initialize Firestore
export const db = getFirestore(app);

// Collection names
export const COLLECTIONS = {
  CONTACT_SUBMISSIONS: 'contact_submissions',
  USERS: 'users',
  FEEDBACK: 'feedback',
};

/**
 * Save a contact form submission to Firestore
 * @param {Object} contactData - Contact form data
 * @returns {Promise<string>} Document ID
 */
export async function saveContactSubmission(contactData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.CONTACT_SUBMISSIONS), {
      ...contactData,
      status: 'new',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    console.log('✅ Contact submission saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving contact submission:', error);
    throw error;
  }
}

/**
 * Get all contact submissions
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of contact submissions
 */
export async function getContactSubmissions(options = {}) {
  try {
    const {
      status = null,
      limit = 50,
      orderByField = 'createdAt',
      orderDirection = 'desc',
    } = options;

    let q = query(
      collection(db, COLLECTIONS.CONTACT_SUBMISSIONS),
      orderBy(orderByField, orderDirection)
    );

    // Filter by status if provided
    if (status) {
      q = query(q, where('status', '==', status));
    }

    // Limit results
    if (limit) {
      q = query(q, firestoreLimit(limit));
    }

    const querySnapshot = await getDocs(q);
    const submissions = [];

    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      });
    });

    return submissions;
  } catch (error) {
    console.error('❌ Error getting contact submissions:', error);
    throw error;
  }
}

/**
 * Get a single contact submission by ID
 * @param {string} id - Document ID
 * @returns {Promise<Object>} Contact submission data
 */
export async function getContactSubmission(id) {
  try {
    const docRef = doc(db, COLLECTIONS.CONTACT_SUBMISSIONS, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      };
    } else {
      throw new Error('Contact submission not found');
    }
  } catch (error) {
    console.error('❌ Error getting contact submission:', error);
    throw error;
  }
}

/**
 * Update contact submission status
 * @param {string} id - Document ID
 * @param {string} status - New status (new, read, replied, closed)
 * @returns {Promise<void>}
 */
export async function updateContactStatus(id, status) {
  try {
    const docRef = doc(db, COLLECTIONS.CONTACT_SUBMISSIONS, id);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now(),
    });

    console.log('✅ Contact submission status updated:', status);
  } catch (error) {
    console.error('❌ Error updating contact status:', error);
    throw error;
  }
}

/**
 * Delete a contact submission
 * @param {string} id - Document ID
 * @returns {Promise<void>}
 */
export async function deleteContactSubmission(id) {
  try {
    await deleteDoc(doc(db, COLLECTIONS.CONTACT_SUBMISSIONS, id));
    console.log('✅ Contact submission deleted');
  } catch (error) {
    console.error('❌ Error deleting contact submission:', error);
    throw error;
  }
}

/**
 * Get contact submissions by user ID
 * @param {string} userId - User ID
 * @param {number} limit - Number of submissions to fetch
 * @returns {Promise<Array>} Array of contact submissions
 */
export async function getContactSubmissionsByUser(userId, limit = 10) {
  try {
    const q = query(
      collection(db, COLLECTIONS.CONTACT_SUBMISSIONS),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      firestoreLimit(limit)
    );

    const querySnapshot = await getDocs(q);
    const submissions = [];

    querySnapshot.forEach((doc) => {
      submissions.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      });
    });

    return submissions;
  } catch (error) {
    console.error('❌ Error getting user contact submissions:', error);
    throw error;
  }
}

/**
 * Get count of unread contact submissions
 * @returns {Promise<number>} Count of unread submissions
 */
export async function getUnreadCount() {
  try {
    const q = query(
      collection(db, COLLECTIONS.CONTACT_SUBMISSIONS),
      where('status', '==', 'new')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('❌ Error getting unread count:', error);
    throw error;
  }
}

/**
 * Example usage in API route:
 *
 * import { saveContactSubmission } from '@/lib/firestore-helpers';
 *
 * export async function POST(request) {
 *   const body = await request.json();
 *   const docId = await saveContactSubmission(body);
 *   return NextResponse.json({ success: true, id: docId });
 * }
 */
