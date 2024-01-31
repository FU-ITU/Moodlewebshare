import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Carddisplay from "@/components/ui/carddisplay";
import { useEffect, useState } from "react";
import Search from "@/components/ui/search";

///get data from search

export default function quizPage({ props }) {
  // const [Data, setData] = useState([]);
  // const user = useAuthContext();
  // let [Query, setQuery] = useState([]);
  // let whoami;

  // const changeQuery = (f) => {
  //   setQuery(f);
  //   console.log(Query);
  // };
  // ///datachange effect
  // useEffect(() => {
  //   async function getData() {
  //     const fetch = await getDoument("all");
  //     setData(fetch);
  //   }
  //   getData();
  // }, []);

  // if (user != null) {
  //   whoami = user["email"];
  //   if (Data.result != null) {
  //     if (Query.length != 0) {
  //       return (
  //         <>
  //           <div className="search-panel">
  //             <Search data={Data} query={changeQuery}></Search>
  //           </div>
           
  //           <div className="frontpage-grid">
  //           <h2 className="center-h1">Components</h2>
  //             {Query.map(function (Query, key = 0) {
  //               key++;
  //               return <Carddisplay key={key} props={Query}></Carddisplay>;
  //             })}
  //           </div>
  //         </>
  //       );
  //     } else {
  //     }
  //     return (

  //       ///check efter Kategori og inddel
  //       <>
  //         <div className="search-panel">
  //           <Search data={Data} query={changeQuery}></Search>
  //         </div>
          
  //         <div className="frontpage-grid">
  //         <h2 className="center-h1">Components</h2>
  //           {Data.result.map(function (Data, key = 0) {
  //             key++;
  //             return <Carddisplay key={key} props={Data}></Carddisplay>;
  //           })}
  //         </div>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <h1>hej! {whoami}, Her er intet data </h1>
  //       </>
  //     );
  //   }
  // } else whoami = "Du er ikke logget ind ";
  // return (
  //   <>
  //     <h1>{whoami} </h1>
  //   </>
  // );
}
