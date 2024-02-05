"use client";
import React, { useEffect, useState } from "react";
import updateData from "@/firebase/database/updatedata";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/firebase/auth/authcontext";
import { deletePost } from "@/firebase/database/deletedata";
import getDoument from "@/firebase/database/getdata";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


////////

function Page(props) {


  const [contenthtml, setContenthtml] = React.useState("");
  const [img, setImg] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const router = useRouter();
  const user = useAuthContext();
  let whoami;
  let filterdata = [];
  if (user != null) {
    whoami = user["uid"];
  }

  const [data, setData] = useState([]);

  const handleRemove = () => {
    props.onRemove();
  };
  const ShowPreview = (e, contentIndex) => {
    let src = URL.createObjectURL(e.target.files[0]);
    let element = "image-preview-update-"+contentIndex
    console.log(element)
    let  preview =
      document.getElementById(element);
      
    preview.src = src;
  };

  const handleFileChange = async (e ,contentIndex) => {

    console.log(contentIndex);
    //image preview
    ShowPreview(e, contentIndex);

    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      console.log(file);

      try {
        props.onUpdate(file.name, props.data);
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

  // console.log("updatepost", data);
  ////skal modtage url param
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  ///////

  const handleGet = async (e) => {
    const { result } = await getDoument("single", search);
    setData(result);
  };

  // let link = "/updatepost?id=" + search;
  useEffect(() => {
    // Update the document title using the browser API
    handleGet();
  }, [data.length]);

  const handleDelete = async (event) => {
    const { result, error } = await deletePost("posts", search);
    if (error) {
      return console.log(error);
    }
    // else successful
    return router.push("/frontpage");
  };

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await updateData("posts", search, {
      creator: user["email"],
      category: category,
      tags: tags,
      name: name,
      content: filterdata,
    });

    if (error) {
      return console.log(error);
    }
    // else successful
    return router.push("/frontpage");
  };

  return (
    <div className="frontpage-grid">
      <div className="wrapper">
        <button onClick={handleDelete}>delete</button>
        <h1>Update</h1>

        <form onSubmit={handleForm} className="form" id="form">
          <label htmlFor="contenthtml"></label>
          <p>Skriv navet på dit opslag</p>
          <input
            onChange={(e) => setName(e.target.value)}
            required
            type="input"
            name="text"
            rows="15"
            cols="50"
            id="name"
            placeholder="Matkend2"
          />

          <h2> Vælg kategori</h2>

          <p></p>
          <label htmlFor="kategori1"> Quiz </label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="radio"
            id="kategori1"
            name="kategori"
            value="kategori1"
          />

          <label htmlFor="kategori2"> Template</label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="radio"
            id="kategori2"
            name="kategori"
            value="kategori2"
          />
          <label htmlFor="kategori3">Video </label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="radio"
            id="kategori3"
            name="kategori"
            value="kategori3"
          />
          <fieldset id="fieldset">
            <legend>Vælg tags</legend>
            <div className="tags checkbox">
              <label htmlFor="tagtemplate"> Html </label>
              <input
                type="checkbox"
                id="tagkode"
                name="tagtemkode"
                value="kode"
                className="switch"
              ></input>
              <label htmlFor="tagquiz"> Iteraktiv </label>
              <input
                type="checkbox"
                id="taginteraktiv"
                name="interaktiv"
                value="interaktiv"
                className="switch"
              ></input>
              <label htmlFor="tagvideo"> Multiplechoice </label>
              <input
                type="checkbox"
                id="tagmultiplechoice"
                name="tagmultiplechoice"
                value="multiplechoice"
                className="switch"
              ></input>
            </div>
          </fieldset>
          {data.content?.map((section, index) => (
            <div className="section " key={index}>
              <h1> Section {index + 1}</h1>
              {section.contentsection.map((contentItem, contentIndex) => (
                <div className="section-content" key={contentIndex}>
                  {contentItem.type === "Imagecontent" && (
                    <div>
                      <h4>Image content</h4>

                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ArrowDownwardIcon />}
                          aria-controls="panel1-content"
                          // id="panel1-header"
                        >
                          <Typography> Content item {contentIndex+1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>

                          <h1> Opdater værdi</h1>
                          <div className="input-section-update">
                            <div className="html-content-heading">
                              <h4>Nr. {contentIndex+1}</h4>
                              <div>
                                <Stack direction="row" spacing={1}>
                                  <DeleteIcon
                                    onClick={handleRemove}
                                  ></DeleteIcon>
                                </Stack>
                              </div>
                            </div>
                            <div className="img-content-wrap">
                              <div className="upload-wrapper">
                                <CloudUploadIcon></CloudUploadIcon>
                                <input
                                  className="data-input"
                                  onChange={(e) => handleFileChange(e, contentIndex)}
                                  required
                                  type="file"
                                  name="image"
                                  id={props.number}
                                  placeholder="imagecontent"
                                />
                              </div>
                              <img
                                id={"image-preview-update-" + contentIndex }
                              
                                className="image-preview"
                                src={"../images/" + contentItem.content}
                              />
                            </div>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  )}

                  {contentItem.type === "Htmlcontent" && (
                    <div>
                      <h4>Html content</h4>

                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ArrowDownwardIcon />}
                          aria-controls="panel1-content"
                          // id="panel1-header"
                        >
                          <Typography> Content item {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <h1>Opdater værdi</h1>
                          <div className="html-content-heading">
                            <h4>Nr. {contentIndex +1}</h4>
                            <Stack direction="row" spacing={1}>
                              <DeleteIcon onClick={handleRemove}></DeleteIcon>
                            </Stack>
                          </div>

                          <div className="html-content-wrap">
                            <p>
                              Indsæt din HTML-kode direkte i inputfeltet, og
                              sørg for, at den er korrekt struktureret med de
                              nødvendige tags.
                              <br />
                              <br />
                              Du kan bruge HTML til at oprette overskrifter,
                              paragraffer, lister, links, billeder og meget
                              mere.
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
                              value={contentItem.content}
                              id={props.number}
                              placeholder="htmlcontent"
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          <button type="submit">Opdater</button>
        </form>
      </div>

      {/* Lav accordion med elementer, som skal opdateres får intputfield datavalue til at være det samme som i objectet  */}
    </div>
  );
}

export default Page;
