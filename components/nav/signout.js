import { getAuth, signOut } from "firebase/auth";

function HandleClick() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.alert("signedout");
    })
    .catch((error) => {
      //  error 
      console.log(error);
    });

    //handler i annoynym funktion // køres ikke på usestate()
}
export default function Signout({ children }) {
  return (
    <>
      <button className="sign-out" onClick={() => HandleClick()}> Log ud</button>
    </>
  );
}
