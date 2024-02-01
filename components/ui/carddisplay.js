import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Carddisplay({ props }) {
  // let link = "/updatepost?id=" + props.id;
  let link = "/displaypost/singlepost?id=" + props.id;
  return (
    <>
      <Link className="post-link" href={link} props={props}>
        <Card sx={{ maxWidth: 4 / 4 }}>
          <CardActionArea>
            {props.data.category &&
              props.data.category.includes("kategori1") && (
                <CardMedia
                  component="img"
                  height="30"
                  image="./templateblue.png"
                  alt="card-content"
                  loading="lazy"
                />
              )}
            {props.data.category &&
              props.data.category.includes("kategori2") && (
                <CardMedia
                  component="img"
                  height="30"
                  image="./templatepink.png"
                  alt="card-content"
                  loading="lazy"
                />
              )}

            {props.data.category &&
              props.data.category.includes("kategori3") && (
                <CardMedia
                  component="img"
                  height="30"
                  image="./templatered.png"
                  alt="card-content"
                  loading="lazy"
                />
              )}

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {props.data.name}
              </Typography>
              <Typography
                gutterBottom
                sx={{ maxWidth: 4 / 4 }}
                variant="h7"
                component="div"
              >
                {props.data.creator}
              </Typography>

              <Typography variant="h6" color="text.secondary">
                {props.data.category}
              </Typography>
              <div className="card-flex-button">
                {props.data.tags && props.data.tags.includes("kode") && (
                  <p className="tag-template" variant="outlined">
                    Kode
                  </p>
                )}

                {props.data.tags && props.data.tags.includes("interaktiv") && (
                  <p className="tag-quiz">Interaktiv</p>
                )}

                {props.data.tags &&
                  props.data.tags.includes("multiplechoice") && (
                    <p className="tag-video" variant="outlined">
                      Multiplechoice
                    </p>
                  )}
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
}
