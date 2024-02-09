import React from "react";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Imagecontent(props) {
 
  const handleRemove = () => {
    props.onRemove();
  };

  const ShowPreview =  (e) =>{
    var src = URL.createObjectURL(e.target.files[0]);
    var preview = document.getElementById("image-preview-update-" + props.number)
    preview.src = src;
    preview.style.display = "flex"

  }

  const handleFileChange = async (e) => {
     //image preview
     ShowPreview(e);

     console.log("handle")
    

    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      console.log(file);
      props.onUpdate(file.name, props.data);

      try {
   
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error uploading image", error);
      }
    }
  };

  return (
    <>
      <div className="html-content-heading">
        <h4>Nr. {props.number + 1}</h4>
        <div>
          <Stack direction="row" spacing={1}>
            <DeleteIcon onClick={handleRemove}></DeleteIcon>
          </Stack>
        </div>
      </div>
      <div className="img-content-wrap">
        <div className="upload-wrapper">
          <CloudUploadIcon></CloudUploadIcon>
          <input
            className="data-input"
            onChange={(e) => handleFileChange(e)}
            required
            type="file"
            name="image"
            id={props.number}
            placeholder="imagecontent"
            
          />
        </div>
        <img
          id={"image-preview-update-" + props.number}
          className="image-preview"
          src={"../images/" + props.contentdata}
        />
      </div>
    </>
  );
}
