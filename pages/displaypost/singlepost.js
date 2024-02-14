"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Link from "next/link";

function DisplaySinglePost({ props }) {
  ////skal modtage url param
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();
  const user = useAuthContext();
  const [data, setData] = useState([]);



  const handleGet = async (e) => {
    const { result } = await getDoument("single", search);
    setData(result);
  };
  

  let link = "/updatepost/updatewithcreate?id=" + search;
  useEffect(() => {
    // Update the document title using the browser API
    handleGet();
  }, [data.length]);

  let whoami;
  if (user != null) {
    whoami = user["uid"];
    return (
      <div className="frontpage-grid">
        <div className="content-wrapper">
          {/* {console.log(data.category)} */}
          <h1>{data.name} </h1>
          {data.content?.map((section, index) => (
            <div key={index}>
              <h3> Section {index + 1}</h3>
              {section.contentsection.map((contentItem, contentIndex) => (
                <div key={contentIndex}>
                  {contentItem.type === "Sectionheading" && (
                    <h1>{contentItem.content}</h1>
                  )}

                  {contentItem.type === "Sectionsubheading" && (
                    <h4>{contentItem.content}</h4>
                  )}

                  {contentItem.type === "Imagecontent" && (
                    <div>
                      <img
                        src={"../images/" + contentItem.content}
                        alt="Image"
                      />
                    </div>
                  )}

                  {contentItem.type === "Htmlcontent" && (
                    <div>
                      <p>{contentItem.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <h3>Creator: {data.creator}</h3>
        </div>
        {console.log(user)}
        {user != null && user.email == data.creator ? (
          <Link className="button-update" href={link}>
            Update
          </Link>
        ) : null}
      </div>
    );
  } else {
    return router.push("/frontpage");
  }
}

export default DisplaySinglePost;
