import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Button } from "@mui/material";
import { Spa } from "@mui/icons-material";

export default function Carddisplay({ props }) {
  // let link = "/updatepost?id=" + props.id;
  let link = "/displaypost/singlepost?id=" + props.id;
  return (
    <>
      <Link className="post-link" href={link} props={props}>
        <Card sx={{ maxWidth: 4 / 4 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="30"
              image="/texture.jpg"
              alt="card-content"
              loading="lazy"
            />
            <CardContent>
              <Typography
                gutterBottom
                sx={{ maxWidth: 4 / 4 }}
                variant="h7"
                component="div"
              >
                {props.data.creator}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.data.name}
              </Typography>
              <div className="card-flex-button">
                {props.data.tags && props.data.tags.includes("kode") && (
                  <span className="tag-template" variant="outlined">
                    <p>Kode</p>
                  </span>
                )}

                {props.data.tags &&
                  props.data.tags.includes("interaktiv") && (
                    <span className="tag-quiz" variant="outlined">
                      <p>Interaktiv</p>
                    </span>
                  )}

                {props.data.tags &&
                  props.data.tags.includes("multiplechoice") && (
                    <span className="tag-video" variant="outlined">
                      <p>Multiplechoice</p>
                    </span>
                  )}
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}
