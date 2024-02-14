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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Sectionheading from "../contentfragments/sectionheading";
import Sectionsubheading from "../contentfragments/sectionsubheading";
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import TitleIcon from '@mui/icons-material/Title';
import React, { useEffect } from "react";;

export default function Section(props) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [dynamicComponents, setDynamicComponents] = React.useState([]);
  ///handlers

  // -------------------------------------------------------------------------

  const updateDynamicComponent = (index, updatedData) => {
    ///datahentes!
 
    setDynamicComponents((prevState) => {
      const updatedComponents = prevState.map((component, i) =>
        i === index ? { ...component, value: updatedData } : component
      );
      console.log(prevState, "hej")
       //updates skal ske her ! - dynamisk
      props.updateData(updatedComponents, props.number);
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
      console.log("newComponents" , newComponents);
      props.updateData(dynamicComponents, props.number);
      return newComponents;
    });
  };
///switchcase til content
  const addContent = (contentType) => {
    let newContent;

    switch (contentType) {
      case "html":
        newContent = <Htmlcontent></Htmlcontent>;
        setDynamicComponents((prevContent) => [...prevContent, newContent]);
        handleClose();
        break;
      case "image":
        newContent = <Imagecontent></Imagecontent>;
        setDynamicComponents((prevContent) => [...prevContent, newContent]);
        handleClose();
        break;
        case "heading":
          newContent = <Sectionheading></Sectionheading>;
          setDynamicComponents((prevContent) => [...prevContent, newContent]);
          handleClose();
          break;
          case "subheading":
            newContent = <Sectionsubheading></Sectionsubheading>;
            setDynamicComponents((prevContent) => [...prevContent, newContent]);
            handleClose();
            break;
      default:
        // Handle default case if contentType doesn't match any specific case
        newContent = null; // Or provide a default component
        break;
        
    }
    
  };



  ////from update function
  const Addfromupdate = (sections) => {
    // Define an array to collect new contents
    const newDynamicComponents = [];
    sections.forEach((element) => {
 console.log(element)
      let newContent;

      switch (element.type) {
        case "Htmlcontent":
          newContent = <Htmlcontent contentdata={element.content}></Htmlcontent>;
          newDynamicComponents.push(newContent);
          break;
        case "Imagecontent":
          newContent = <Imagecontent contentdata={element.content}></Imagecontent>;
          newDynamicComponents.push(newContent);
          break;
          case "Sectionheading":
            newContent = <Sectionheading contentdata={element.content}></Sectionheading>;
            newDynamicComponents.push(newContent);
            break;
            case "Sectionsubheading":
              newContent = <Sectionsubheading ></Sectionsubheading>;
              newDynamicComponents.push(newContent);
              break;
        default:
          // Handle default case if contentType doesn't match any specific case
          newContent = null; // Or provide a default component
          break;
      
    }
    
  });

    // After iterating through all elements, update the dynamic components state once
    setDynamicComponents([...newDynamicComponents]);
  };



  useEffect(() => {
    if (props.content?.props?.content?.contentsection) {
      Addfromupdate(props.content.props.content.contentsection);
    }
    console.log("hej", "useEffect")

  }, [setDynamicComponents]);
  

  

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
  
      <section className="section">
        <Accordion className="section-content" defaultExpanded >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        <h3> Dette er section {props.number + 1}</h3>
        </AccordionSummary>
        <AccordionDetails>
        {dynamicComponents.map((ChildComponent, index) =>
            React.cloneElement(ChildComponent, {
              key: index,
              data: dynamicComponents,
              onUpdate: (updatedData) =>
                updateDynamicComponent(index, updatedData),
              onRemove: () => removeComponent(index),
              number: index,
              section: props.number,
              value: ChildComponent.value,
            })
          )}

       
        </AccordionDetails>
        <Stack direction="column" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<AddBoxIcon />}
            onClick={handleOpen}
          >
            Tilføj content til section {props.number + 1}
          </Button>
        </Stack>
      </Accordion>
     
       
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
                <TitleIcon onClick={() => addContent("heading")}></TitleIcon>
                  <p>Title</p>
                </div>
                <div className="icon-link">
                <InsertPageBreakIcon onClick={() => addContent("subheading")}></InsertPageBreakIcon>
                  <p>Subtitle</p>
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
    
  );
}
