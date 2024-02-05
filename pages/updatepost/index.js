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

////////

function Page(props) {
  const [data, setData] = useState([]);

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
      <div className="wrapper" >
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
            <div  className="section "key={index}>
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
                          <Typography> Section {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                    
                            <h2> Gammel værdi</h2>
                            <img
                              src={"../images/" + contentItem.content}
                              alt="Image"
                            />
                        
                          <h1> Opdater værdi</h1>
                          <div className="input-section-update">
                            <label htmlFor="img">
                              <p>Img </p>
                              <input
                                onChange={(e) => setImg(e.target.value)}
                                required
                                type="file"
                                name="text"
                                id="img"
                                placeholder="htmlcontent"
                                value={img}
                              />
                            </label>
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
                          <Typography> Section {index + 1}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                       
                            <h2>Gammel værdi</h2>
                            <p>{contentItem.content}</p>
                       
                          <h1>Opdater værdi</h1>
                          <div className="input-section-update">
                            <textarea
                              onChange={(e) => setContenthtml(e.target.value)}
                              required
                              type="textarena"
                              name="text"
                              rows="15"
                              cols="50"
                              id="contenthtml"
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
