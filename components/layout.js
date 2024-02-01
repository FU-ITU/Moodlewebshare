import Navside from "./nav/navside";
import { AuthContextProvider } from "@/firebase/auth/authcontext";
import MobileNav from "./nav/mobile-nav";

export default function Layout({ children }) {
  return (
    <>
      <AuthContextProvider>
        <main>
          <div className="content">
            <Navside></Navside>
            <MobileNav></MobileNav>
            {children}
          </div>
        </main>
      </AuthContextProvider>
    </>
  );
}
