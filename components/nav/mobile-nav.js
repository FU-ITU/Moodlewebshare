import Link from "next/link";
import Signout from "@/components/nav/signout";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";



const handClick = () =>{
  var nav = document.getElementById("mobile-navigation");
  if (nav.style.display === "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
}

const HandleClose = () =>{
  var nav = document.getElementById("mobile-navigation").style.display = "none";
}



export default function MobileNav({ props }) {
    return (
      <>
       <MenuIcon onClick={handClick} className="burger-icon" id="burger-icon"></MenuIcon>
        <div  onClick={HandleClose} className="mobile-navigation" id="mobile-navigation">
         
        <div className="profile-top-section">
        </div>
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
          {/* <Signout></Signout> */}
          {/* <LogoutIcon></LogoutIcon> */}
        </div>
     
    </>
    );
  } 

