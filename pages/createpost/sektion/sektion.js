/// Skal reffes til content fragments dynamisk onload fragments hvis de er til stede, så skal viewet dynamisk rendere sektionen i display card og i displaysinglepage

import Htmlcontent from "../contentfragments/htmlcontent";
import Imagecontent from "../contentfragments/imagecontent";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CodeIcon from "@mui/icons-material/Code";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Stack from "@mui/material/Stack";
import React, { Component, use, useEffect } from "react";
import updateData from "@/firebase/database/updatedata";

export default function Section(props) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [dynamicComponents, setDynamicComponents] = React.useState([]);
  ///handlers

  // -------------------------------------------------------------------------

  const updateDynamicComponent = (index, updatedData) => {
    ///datahentes!
    console.log("updating")
   
    console.log(props.number);

   
    setDynamicComponents((prevState) => {
      const updatedComponents = prevState.map((component, i) =>
        i === index ? { ...component, value: updatedData } : component
      );

      return updatedComponents;
    });

    if (dynamicComponents) {
      document.getElementById("button-create-sticky-footer").style.display =
        "flex";
    }
  };

  const removeComponent = (indexToRemove) => {
    indexToRemove = Number(indexToRemove);
    setDynamicComponents((prev) => {
      const newComponents = [
        ...prev.slice(0, indexToRemove),
        ...prev.slice(indexToRemove + 1),
      ];
      return newComponents;
    });
  };

  const addContent = (contentType) => {
    const newContent =
      contentType === "html" ? (
        <Htmlcontent></Htmlcontent>
      ) : (
        <Imagecontent></Imagecontent>
      );

    if (contentType === "html") {
      setDynamicComponents((prevHtmlContent) => [
        ...prevHtmlContent,
        newContent,
      ]);
    } else {
      setDynamicComponents((prevImgContent) => [...prevImgContent, newContent]);
    }

    handleClose();
  };

  useEffect(() => {
    console.log("useeffect");
    //update data til parrent
    props.updateData(dynamicComponents,props.number);
  }, [dynamicComponents]);

  ///modale style = sx
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1.3px solid #168b7c",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      {}
      <section className="section">
        <h3> Dette er section {props.number + 1}</h3>
        <div className="section-content">
          {dynamicComponents.map((ChildComponent, index) =>
            React.cloneElement(ChildComponent, {
              key: index,
              data: dynamicComponents,
              onUpdate: (updatedData) =>
                updateDynamicComponent(index, updatedData),
              onRemove: () => removeComponent(index),
              number: index,
              value: ChildComponent.value,
            })
          )}
        </div>

        <Stack direction="column" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<AddBoxIcon />}
            onClick={handleOpen}
          >
            Tilføj content til section {props.number + 1}
          </Button>
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="create-types">
              <p>Vælg Type af content</p>
              <div className="modal-content-wrapper">
                <div className="icon-link">
                  <CodeIcon onClick={() => addContent("html")}></CodeIcon>
                  <p>kode</p>
                </div>
                <div className="icon-link">
                  <ImageIcon onClick={() => addContent("image")}></ImageIcon>
                  <p>image</p>
                </div>
                <div className="icon-link">
                  <UploadFileIcon></UploadFileIcon>
                  <p>fil</p>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </section>
    </>
  );
}