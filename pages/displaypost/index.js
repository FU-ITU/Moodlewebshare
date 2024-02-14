"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthContext } from "@/firebase/auth/authcontext";
import Link from "next/link";

////////

function DisplayPost({ props }) {
  ////skal modtage url param
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAuthContext();

  let whoami;
  if (user != null) {
    whoami = user["uid"];
    let link = "/displaypost/singlepost?id=" + props.id;
    return (
      <div className="content-wrapper-template" id={props.data.name}>
        <div className="sub-content-wrapper">
          {/* {console.log(data.category)} */}
          <h1>{props.data.name} </h1>
          {props.data.content?.map((section, index) => (
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
                      <img src={"../images/" + contentItem.content} alt="Image" />
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
          <h3>Creator: {props.data.creator}</h3>
          <Link className="se-mere-button" href={link}> <p>mere info</p> </Link>
        </div>
      </div>
    );
  } else {
    return router.push("/frontpage");
  }
}

export default DisplayPost;
