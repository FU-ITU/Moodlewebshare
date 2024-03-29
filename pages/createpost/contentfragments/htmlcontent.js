import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Content } from "next/font/google";

export default function Htmlcontent(props) {

  const handleClick = (e) => {
    const updatedData = e.target.value;
    props.onUpdate(updatedData, props.data);
    console.log("updating")
  };

  const handleRemove = () => {
    props.onRemove();
    props.onUpdate("", props.data);
  };

  return (
    <>
      <div className="html-content-heading">
        <h4>Nr. {props.section+1}.{props.number + 1}</h4>
        <Stack direction="row" spacing={1}>
          <DeleteIcon onClick={handleRemove}></DeleteIcon>
        </Stack>
      </div>
      <div className="html-content-wrap">
      
        <p>
          Indsæt din HTML-kode direkte i inputfeltet, og sørg for, at den er
          korrekt struktureret med de nødvendige tags.
          <br />
          <br />
          Du kan bruge HTML til at oprette overskrifter, paragraffer, lister,
          links, billeder og meget mere.
        </p>
        <textarea
          className="data-input"
          // onChange={(e) => props.changestate(props.number, e.target.value)}
          onChange={(e) => handleClick(e)}
          required
          type="input"
          name="text"
          rows="15"
          cols="50"
          id={props.section + props.number}
          placeholder={props.contentdata}
          defaultValue={props.contentdata}
        ></textarea>
      </div>
    </>
  );
}
