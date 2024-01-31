"use client";
import React from "react";
import updateData from "@/firebase/database/updatedata";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/firebase/auth/authcontext";
import { deletePost } from "@/firebase/database/deletedata";

////////

function Page() {
  ////skal modtage url param
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  ///////

  const [contenthtml, setContenthtml] = React.useState("");
  const [img, setImg] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [name, setName] = React.useState("");
  const router = useRouter();
  const user = useAuthContext();
  let whoami;
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
      contenthtml: contenthtml,
      img: img,
      creator: user["email"],
      category: category,
      name: name,
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
        <h1>Update</h1>
        <button onClick={handleDelete}>delete</button>
        <form onSubmit={handleForm} className="form">
          <p>Navn</p>
          <input
            onChange={(e) => setName(e.target.value)}
            required
            type="input"
            name="text"
            rows="15"
            cols="50"
            id="name"
            placeholder="name"
          />
          <label htmlFor="contenthtlm"> </label>
          <p>Content</p>
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

          <p>vælg kategori</p>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="radio"
            id="kategori1"
            name="kategori"
            value="kategori1"
          />
          <label htmlFor="Kategori1"> Kategori1 </label>

          <input
            onChange={(e) => setCategory(e.target.value)}
            type="radio"
            id="kategori2"
            name="kategori"
            value="kategori2"
          />
          <label htmlFor="Kategori2"> Kategori2</label>
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="radio"
            id="kategori3"
            name="kategori"
            value="kategori3"
          />
          <label htmlFor="Kategori3">Kategori3 </label>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
