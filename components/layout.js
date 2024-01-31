import Navside from "./nav/navside";
import { AuthContextProvider } from "@/firebase/auth/authcontext";

export default function Layout({ children }) {
  return (
    <>
      <AuthContextProvider>
        <main>
          <div className="content">
            <Navside></Navside>
            {children}
          </div>
        </main>
      </AuthContextProvider>
    </>
  );
}
