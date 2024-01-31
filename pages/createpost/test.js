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
  const [section, setSection] = React.useState([]);
  const router = useRouter();
  const [data, setData] = React.useState([]);
  const user = useAuthContext();
  const id = useId();
  ////dynamic content
  const addSection = () => {
    setSection([
      ...section,
      <Section
        key={sectioncount}
        number={sectioncount}
        setData={setData}
        data={data}
      ></Section>,
    ]);
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

    console.log(section, "date from sections");

    data.forEach((e) => {
      console.log(e);
    });
    // const { result, error } = await addData("posts", user, {
    //   creator: user["email"],
    //   category: category,
    //   name: name,
    //   content: data,
    // });

    // if (error) {
    //   return console.log(error);
    // }
    // console.log(result);
    // return router.push("/frontpage");
  };

  return (
    <>
      <div className="frontpage-grid">
        <div className="wrapper-create">
          <div className="form-wrapper" id="form-wrapper">
            <h1>Lav et opslag</h1>
            <form onSubmit={handleForm} className="form">
              <label htmlFor="contenthtml"></label>
              <p>Navn på opslag</p>
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
              <div
                className="button-create-sticky-footer"
                id="button-create-sticky-footer"
              >
                <button type="submit">Opret</button>
              </div>
              <div className="create-section">
                <div>
                  {section.map((sectionItem, index) => (
                    <div key={index}>
                      {React.cloneElement(sectionItem, {
                        number: index,
                      })}
                      <Button onClick={() => removeSection(index)}>
                        Remove Section
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </form>

            <Button onClick={addSection}>
              <AddCircleIcon></AddCircleIcon>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
