"use client";
import React from "react";
import { useAuthContext } from "@/firebase/auth/authcontext";
import { useRouter } from "next/navigation";
import Signout from "@/components/nav/signout";
function Page() {
  const user = useAuthContext();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) router.push("/signin");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div className="frontpage-grid">
        <h1>admin page måske?</h1>
      </div>
    </>
  );
}

export default Page;
