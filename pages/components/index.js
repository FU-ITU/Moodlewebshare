import { useAuthContext } from "@/firebase/auth/authcontext";
import quizPage from "./quiz";
import Templates from "./templates";
import videoPage from "./video";
import { useRouter } from "next/router";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

///get data from search

export default function ComponentsPage({ props }) {
  const user = useAuthContext();
  let whoami;
  const router = useRouter();
  if (user != null) {
    whoami = user["email"];
    return (

      <div className="frontpage-grid">
        <div className="component-overview">
          <div className="component-template">
            <Link href="/components/templates">
            <Card xl={{ maxWidth: 4 / 4 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image="/template.png"
                  alt="card-content"
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Templates
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </Link>
          </div>
          

          <div className="component-quiz">
            <Card xl={{ maxWidth: 4 / 4 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image="/quiz.png"
                  alt="card-content"
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Quiz
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div className="component-video">
            <Card xl={{ maxWidth: 4 / 4 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  image="/video.png"
                  alt="card-content"
                />
                <CardContent>
                  <Typography variant="body1" color="text.secondary">
                    Video
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
        {/* ///dynamic fetch og render  */}
        {/* <quizPage></quizPage> */}
        {/* <videoPage></videoPage>
      <templatesPage></templatesPage> */}
      </div>
    );
  } else {
    router.push("/signin");
  }
}
