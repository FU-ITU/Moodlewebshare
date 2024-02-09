import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(colllection, id, data) {
  console.log(id["uid"]);
  let result = null;
  let error = null;
  let unik = (Math.random() + 1).toString(36).substring(7);

  console.log(id);
  console.log(data)
  try {
    //add 
    result = await setDoc(doc(db, colllection, id["uid"]+unik), data, {
      merge: true,
    });

    // ///update - Skal have id'et send af props fra map => i runtime update page --> modtager id ref parent component som paramenter i url;
    // result = await setDoc(doc(db, colllection, id["uid"]+date), data, {
    //   merge: true,
    // });


  } catch (e) {
    error = e;
  }

  return { result, error };
}


