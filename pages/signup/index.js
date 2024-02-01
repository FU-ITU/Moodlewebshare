"use client";
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

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
          <h1>Opret en konto</h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />

          <button type="submit">Opret</button>
        </form>
      </div>
    </div>
  </div>
  );
}

export default Page;
