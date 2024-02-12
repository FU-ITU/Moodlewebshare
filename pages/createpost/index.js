"use client";
import React from "react";
import addData from "@/firebase/database/adddata";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/firebase/auth/authcontext";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Section from "./sektion/sektion";
import { Button } from "@mui/material";
import { useEffect, useId } from "react";

function Page() {
  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const [sectioncount, setSectioncount] = React.useState(0);
  const [sections, setSection] = React.useState([]);
  const router = useRouter();
  const [data, setData] = React.useState([]);
  const user = useAuthContext();
  const id = useId();
  const addSection = () => {
    const newSection = <Section key={generateUniqueKey()}></Section>;
    setSection([...sections, newSection]);
  };

  const generateUniqueKey = () => {
    return Date.now();
  };

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

  const updateData = (dynamicComponents, index) => {
     console.table(dynamicComponents);
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
    // console.log(data);
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
    event.preventDefault();

    const tags = await getTags(); // henter tags
    // console.log(tags);
  
     console.log(data);

    //rekursiv
    let filterdata = [];
    data.map((section) => {
      console.log(section);
      let sectoins = section.sectioncontent;
      let contentsection = [];
      sectoins.forEach((datafield) => {
        contentsection.push({
          content: datafield.value,
          type: datafield.type.name,
        });
      });
      filterdata.push({ contentsection });
    });

    console.log(filterdata);
    const { result, error } = await addData("posts", user, {
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

  ////dynamic content
  if (user != null) {
   let whoami = user["email"];
    return (
      <>
        <div className="frontpage-grid">
          <div className="wrapper-create">
            <div className="form-wrapper" id="form-wrapper">
              <h1>Lav et opslag</h1>
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
                <div
                  className="button-create-sticky-footer"
                  id="button-create-sticky-footer"
                >
                  <button type="submit">Opret</button>
                </div>
                <div className="create-section">
                  {sections.map((sectionItem, index) => (
                    <div key={index}>
                      {React.cloneElement(sectionItem, {
                        number: index,
                        updateData: updateData,
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
