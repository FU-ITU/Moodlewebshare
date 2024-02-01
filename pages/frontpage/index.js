import { useAuthContext } from "@/firebase/auth/authcontext";
import getDoument from "@/firebase/database/getdata";
import Carddisplay from "@/components/ui/carddisplay";
import { useEffect, useState } from "react";
import Search from "@/components/ui/search";
import CircularProgress from "@mui/material/CircularProgress";

///get data from search

export default function FrontPage(props) {
  const [Data, setData] = useState([]);
  const user = useAuthContext();
  let [Query, setQuery] = useState([]);
  let whoami;

  const changeQuery = (f) => {
    // setData(f);
    // setQuery([]);
    // console.log(f);
    setQuery(f);
  };
  ///datachange effect
  useEffect(() => {
    async function getData() {
      const fetch = await getDoument("all");
      setData(fetch);
      changeQuery([]);
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
              <h1 className="center-h1">Her er hvad vi fandt...</h1>
              {Query.map(function (Query, key = 0) {
                key++;
                return <Carddisplay key={key} props={Query}></Carddisplay>;
              })}
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

          <div className="frontpage-grid">
            <h2 className="center-h1">Alle eksempler</h2>
            {Data.result.map(function (Data, key = 0) {
              key++;
              return <Carddisplay key={key} props={Data}></Carddisplay>;
            })}
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
      <div className="frontpage-grid">
        <h1>{whoami} </h1>
      </div>
    </>
  );
}
