///her skal der laves quries til search fuctionen :
import { RestartAlt } from "@mui/icons-material";
import firebase_app from "../config";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  get,
} from "firebase/firestore";

//db
const db = getFirestore(firebase_app);

export default async function getDoument(datacollection, id) {
  let result = null;
  let error = null;
  let data = [];

  // console.log(datacollection, id);

  switch (datacollection) {
    case "all":
      try {
        const posts = await getDocs(collection(db, "posts"));
        posts.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          data.push({ id: doc.id, data: doc.data() });
          result = data;
        });
        // console.log(result);
        return { result };
      } catch (error) {
        alert(error);
      }
      break;
    case "single":
      let docRef = doc(db, "posts", id);
      try {
        result = await getDoc(docRef);
        console.log(result);
        if (result.exists()) {
          // console.log(result.data());
          result = result.data();
          return { result };
        }
      } catch (e) {
        error = e;
      }
    case "template":
      try {
        let dbcollection = collection(db, "posts");
        let result = await getDocs(
          query(dbcollection, where("category", "==", "kategori2")) 
        );

        result.forEach((doc) => {
          data.push({ id: doc.id, data: doc.data() });
        });
        result = data;
        return { result };
      } catch (e) {
        console.error("Error:", e);
        throw e; // Re-throw the error to handle it in the calling code
      }

    default:
      break;
  }

  return { result, error };
}
