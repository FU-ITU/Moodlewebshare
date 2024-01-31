import Image from "next/image";
import { Inter } from "next/font/google";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <div className="frontpage-grid">
        <div className="frontpage-content">
          <div className="frontpage-left">
            <h1>Moodlewebshare</h1>
            <h2>Til Udvikling og Deling </h2>
            <p>
              Vi tror på magten ved at dele viden. MoodleWebShare giver dig
              mulighed for at uploade og dele alt fra undervisningsmaterialer,
              præsentationer, quizzer, og meget mere. Med vores intuitive
              platform kan du nemt organisere dine ressourcer og gøre dem
              tilgængelige for andre.
            </p>
          </div>
          <div className="frontpage-right ">
            <Image
              alt="frontpage"
              loading="lazy"
              src="/fuinner.png"
              width="600"
              height="300"
              className="fuinner rotate"
            ></Image>

          </div>
        </div>
      </div>
    </main>
  );
}
