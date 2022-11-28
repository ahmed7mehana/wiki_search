import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [search, setsearch] = useState("");
  //count of the result
  const [searchinfo, setsearchinfo] = useState([]);
  //all info about search
  const [result, setresult] = useState([]);

  const hundle = async (e) => {
    e.preventDefault();
    if (search === "") return;
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;
    const temp = await fetch(url);
    const json = await temp.json();
    // console.log(json);
    setsearchinfo(json.query.searchinfo);
    setresult(json.query.search);
  };
  return (
    <div>
      <div className="header">
        <h2>wiki search</h2>
        <form onSubmit={hundle}>
          <input
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="what you looking for ??"
          />
        </form>
        {searchinfo.totalhits ? (
          <p className="Result">
            Result : <strong>{searchinfo.totalhits}</strong>{" "}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className="results">
        {result.map((item, i) => {
          const url = `https://en.wikipedia.org/?curid=${item.pageid}`;
          return (
            <div className="result" key={i}>
              <h2>{item.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: item.snippet }}></p>
              <a href={url} target="_blank">
                read more
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
