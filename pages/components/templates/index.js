import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import DisplayPost from "@/pages/displaypost";
import Search from "@/components/ui/search";
import NavsideSubpage from "@/components/nav/navside-subpage";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

///get data from search

export default function Templates({ props }) {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let [Query, setQuery] = useState([]);
  const nav = [];
  let whoami;

  const changeQuery = (f) => {
    setQuery(f);
    console.log(Query);
  };
  ///datachange effect
  useEffect(() => {
    async function getData() {
      const fetch = await getDoument("template");
      setData(fetch);
    }
    getData();
  }, []);

  if (user != null) {
    whoami = user["email"];
    if (Data.result != null) {
      if (Query.length != 0) {
        return (
          <>
            <div className="search-panel">
              <Search data={Data} query={changeQuery}></Search>
            </div>

            <div className="frontpage-grid">
              <div className="page-content">
                <h2 className="center-h1">Dine resultater:</h2>
                <div className="page-content-link-grid">
                  {Query.map(function (Query, key = 0) {
                    key++;
                    console.log(Data.result.name);
                    // nav.push(Data.data.name);
                    return <DisplayPost key={key} props={Query}></DisplayPost>;
                  })}
                </div>
                {/* <NavsideSubpage props={nav} ></NavsideSubpage> */}
              </div>
            </div>
          </>
        );
      } else {
      }
      return (
        <>
          <div className="search-panel">
            <Search data={Data} query={changeQuery}></Search>
          </div>
          <h1 className="center-h1">Templates</h1>
          <div className="frontpage-grid">
            <div className="page-content">
              <div className="page-content-link-grid">
                {Data.result.map(function (Data, key = 0) {
                  key++;
                  nav.push(Data.data.name);

                  return <DisplayPost key={key} props={Data}></DisplayPost>;
                })}
              </div>

              <NavsideSubpage props={nav}></NavsideSubpage>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="frontpage-grid">
            <CircularProgress color="inherit" />
          </div>
        </>
      );
    }
  } else whoami = "Du er ikke logget ind ";
  return (
    <>
      <h1>{whoami} </h1>
    </>
  );
}
