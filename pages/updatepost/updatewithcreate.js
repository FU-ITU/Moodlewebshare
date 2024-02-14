"use client";
import addData from "@/firebase/database/adddata";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Section from "../createpost/sektion/sektion";
import { Button, ButtonBase } from "@mui/material";
import React, { useEffect, useState, useId, useRef } from "react";
import updatedataDatabase from "@/firebase/database/updatedata";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/firebase/auth/authcontext";
import { deletePost } from "@/firebase/database/deletedata";
import getDoument from "@/firebase/database/getdata";


function Page() {

 
  const [sections, setSection] = React.useState([]);
  const router = useRouter();
  const [data, setData] = React.useState([]);
  const [name, setName] = React.useState(data.name);
  const user = useAuthContext();
  const id = useId();
  const [category, setCategory] = React.useState(data.category);

  const addSection = (content) => {
    const newSection = (
      <Section key={generateUniqueKey()} content={content}></Section>
    );
    
    setSection((prevSections) => [...prevSections, newSection]);

    ///if section is from new section
  };

  ///update function for update:


  
  const updateDataupdate = (dynamicComponents, index) => {
    setData((prevData) => {
      const newData = [...prevData];
      const existingObject = newData[index];

      if (existingObject) {
        // If the object at the specified index exists, update its content
        existingObject.sectioncontent = dynamicComponents;
      } else {
        // If the object at the specified index doesn't exist, create a new one
        newData[index] = { sectioncontent: dynamicComponents };
      }

      return newData;
    });

    console.log("fraupdate",data)
  };

  const generateUniqueKey = () => {
    return Date.now();
  };

  const handleGet = async (e) => {
    const { result } = await getDoument("single", search);
     
    let sections = [];

    // console.log(result.content);
    for (const sectionItem of result.content) {
      const newSection = (
        <Section key={generateUniqueKey()} content={sectionItem}></Section>
      );
      
      sections.push(newSection);
      
  
      ///if section is from new section
    };
    
    console.log("sectionsfromupdate",sections)
    setSection(sections);
  
    
  };

  console.log(data);

  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  ///////

  const getTags = async () => {
    let newtags = [];
    let fields = document
      .getElementById("fieldset")
      .getElementsByTagName("input");
    let fielsarray = Array.from(fields);

    fielsarray.forEach((checkbox) => {
      if (checkbox.checked === true) {
        // console.log("checked");
        newtags.push(checkbox.value);
      }
    });
    return newtags;
  };

  // let link = "/updatepost?id=" + search;
  useEffect(() => {
    // Update the document title using the browser API
    console.log("useffect", "updatepage")
  }, []);


  const handleDelete = async (event) => {
    
    const { result, error } = await deletePost("posts", search);
    if (error) {
      return console.log(error);
    }
    // else successful
    return router.push("/frontpage");
  };



  // console.log(data);
  //se om section har chilren ellers så remove:
  const removeSection = (sectionIndex) => {
    sectionIndex = Number(sectionIndex);
    setSection((prev) => {
      const newComponents = prev.filter((_, index) => index !== sectionIndex);
      return newComponents;
    });
  };


  

  const handleForm = async (event) => {

    console.log("fra update",data);
    event.preventDefault();

    const tags = await getTags(); // henter tags
  
    let filterdata = [];
    data.map((section) => {
      console.log(section);
      let sectoins = section.sectioncontent;
      let contentsection = [];
      console.log(typeof sections)

      sectoins.forEach((datafield) => {
        contentsection.push({
          content: datafield.value,
          type: datafield.type.name,
        });
      });
      filterdata.push({ contentsection });
    });

    console.log("finalfromupdate",filterdata);
  

    const { result, error } = await updatedataDatabase("posts", search, {
      creator: user["email"],
      category: category,
      tags: tags,
      name: name,
      content: filterdata,
    });


    if (error) {
      return console.log(error);
    }
    // console.log(result);
    return router.push("/frontpage");
  };
  // --------------------------------------------------------------

  /////////////
  if (user != null) {
    let whoami = user["email"];
    return (
      <>
     
        <div className="frontpage-grid">    
          <div className="wrapper-create">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={(e) =>handleGet()}> Se gamle værdier</button>
          <button type="submit">Gem</button>
            <div className="form-wrapper" id="form-wrapper">
              <h1>Opdater</h1>
              <form onSubmit={handleForm} className="form">
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
                  placeholder={data.name}
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
                <div
                  className="button-create-sticky-footer-update"
                  id="button-create-sticky-footer"
                >
                 
                </div>
                <div className="create-section">
                  {sections.map((sectionItem, index) => (
                    <div key={index} className="section-content">
                      {React.cloneElement(sectionItem, {
                        number: index,
                        updateData: updateDataupdate,
                        content: sectionItem
                      })}

                      <Button
                        className="remove-section-button"
                        onClick={() => removeSection(index)}
                      >
                        Remove Section
                      </Button>
                    </div>
                  ))}
                </div>
              </form>

              <Button className="add-section-button" onClick={addSection}>
                <AddCircleIcon></AddCircleIcon>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    router.push("/signin");
  }
}

export default Page;
