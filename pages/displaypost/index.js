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
                  {contentItem.type === "Imagecontent" && (
                    <div>
                      <h4>Image content</h4>
                      <img src={"/images/" + contentItem.content} alt="Image" />
                    </div>
                  )}

                  {contentItem.type === "Htmlcontent" && (
                    <div>
                      <h4>Html content</h4>
                      <p>{contentItem.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <h3>Creator: {props.data.creator}</h3>
          <Link href={link}> Mere info</Link>
        </div>
      </div>
    );
  } else {
    return router.push("/frontpage");
  }
}

export default DisplayPost;
