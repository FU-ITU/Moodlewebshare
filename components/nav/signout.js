import { getAuth, signOut } from "firebase/auth";
import { Logout } from "@mui/icons-material";
import Link from "next/link";

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
      <Link className="nav-link"  href="" onClick={() => HandleClick()}> <Logout></Logout> <p>Log ud</p></Link>
    </>
  );
}
