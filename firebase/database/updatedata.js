import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function updateData(colllection, id, data) {
  let result = null;
  let error = null;

  console.log(id);

  //if statement til delete fra samme component 
  try {
    //udate skal have id fra url param send fra component fra map ==>  
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });

    ////delete skal laves 


  } catch (e) {
    error = e;
  }



  return { result, error };
}

