import { db } from "../../firebase"; // Your Firebase config
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function saveCustomerProfile(uid: string, data: any) {
  await setDoc(doc(db, "customers", uid), data, { merge: true });
}

export async function getUserProfile(uid: string) {
  const docRef = doc(db, "customers", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}
