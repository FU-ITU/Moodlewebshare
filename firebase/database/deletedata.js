import firebase_app from "../config";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
const db = getFirestore(firebase_app);
export async function deletePost(colllection, id) {
  let result = null;
  let error = null;
  try {
    result = await deleteDoc(doc(db, colllection, id), {
      merge: true,
    });
  } catch (e) {
    error = e;
  }
  return { result, error };
}
