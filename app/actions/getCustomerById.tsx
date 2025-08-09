import { db } from "../../firebase"; // Your Firebase config
import { doc, getDoc} from "firebase/firestore";


export async function getCustomerProfile(uid: string) {
  const docRef = doc(db, "customers", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}
