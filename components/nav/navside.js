import Link from "next/link";
import Signout from "@/components/nav/signout";
import { useAuthContext } from "@/firebase/auth/authcontext";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArtTrackIcon from "@mui/icons-material/ArtTrack";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function Navside({ children }) {
  const user = useAuthContext();
  const greeting = user ? user["email"] : "";
  return (
    <>
      <aside className="nav">
        <div className="profile-top-section">
          <h4> Hej!<br></br>{greeting}</h4>
        </div>
        <div className="sideNavigation">
          {/* Toplayer --> sub catagories --> subcategories  */}
          <Link className="nav-link" href="/">
            <HomeIcon></HomeIcon>
            <p>Home</p>
          </Link>
          <Link className="nav-link" href="/frontpage">
            <RemoveRedEyeIcon></RemoveRedEyeIcon>
            <p>Oversigt</p>
          </Link>
          <Link className="nav-link" href="/components">
            <DashboardIcon></DashboardIcon>
            <p>Components</p>
          </Link>
          <Link className="nav-link" href="/createpost">
            <AddBoxIcon></AddBoxIcon>
            <p>Create</p>
          </Link>
          <Link className="nav-link" href="/admin">
            <AdminPanelSettingsIcon></AdminPanelSettingsIcon>
            <p>Admin</p>
          </Link>
          <Link className="nav-link" href="/signin">
            <LoginIcon></LoginIcon>
            <p>Login</p>
          </Link>
        </div>
        <div className="profile-section">
          <Signout></Signout>
          {/* <LogoutIcon></LogoutIcon> */}
        </div>
      </aside>
    </>
  );
}
