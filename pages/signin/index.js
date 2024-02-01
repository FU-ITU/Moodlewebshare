"use client";
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);
    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/");
  };
  return (
    <div className="frontpage-grid">
      {/* <img className="login-img" src="../images/background.jpg"></img> */}
      <div className="wrapper">
        <div className="form-wrapper-signin">
          <form onSubmit={handleForm} className="form">
            <h1>Log ind</h1>
            <div className="input-container">
            <PersonIcon></PersonIcon>
              <input
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                name="email"
                id="email"
                placeholder="example@mail.com"
              />
            </div>
            <div className="input-container">
             <LockIcon></LockIcon>
              <input
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
            </div>
            <button type="submit">LOG IND</button>

            <Link className="nav-link-signin" href="/signup">
              <p>Opret en konto her</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
