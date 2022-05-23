import { React } from "react";
import EmployeeList from "./EmployeeList";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import FilterButton from "./FilterButton";
let passedFilters = new Set();
const Home = () => {
  let pageid = 0;
  const globalurl = "http://localhost:8000/results?";
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [emptyres, setEmptyRes] = useState(false);
  const [searchval, setSearchVal] = useState("");
  const [allDeps, setAllDeps] = useState(null);
  const [allTitles, setAllTitles] = useState(null);
  const [allCountries, setAllCountries] = useState(null);
  const LoadData = (url, pageid) => {
    const abortCont = new AbortController();
    var pageidStr = pageid && pageid != 0 ? "&_page=" + pageid : "";
    fetch(url + pageidStr, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok)
          throw Error(
            "An error occurred while trying to fetch data for that url."
          );
        return res.json();
      })
      .then((data) => {
        setData(data);
        const allDepsValues = [
          "All",
          ...new Set(data.map((item) => item.department).sort()),
        ];
        setAllDeps(allDepsValues);
        const allCountriesValues = [
          "All",
          ...new Set(data.map((item) => item.country).sort()),
        ];
        setAllCountries(allCountriesValues);
        const allTitles = [
          "All",
          ...new Set(data.map((item) => item.title).sort()),
        ];
        setAllTitles(allTitles);
        setIsLoading(false);
        setError(null);
      });
  };
  useEffect(() => {
    const abortCont = new AbortController();
    LoadData(globalurl, pageid);
    return () => abortCont.abort();
  }, [globalurl]);

  const filter = (e, prop, slctd) => {
    const abortCont = new AbortController();
    e.preventDefault();
    // I am creating the link to be fetched from the jsonServer depending on the user's selections
    var filterdict = new Object();
    filterdict.prop = prop;
    filterdict.val = slctd.singleval;
    var url = globalurl;
    if (slctd.singleval === "All") {
      passedFilters = new Set();
    } else {
      var newf = true;
      var slctdVal = false;
      for (let singlefilter of passedFilters) {
        if (
          singlefilter.prop === prop &&
          singlefilter.val === slctd.singleval
        ) {
          newf = false;
          break;
        }
      }
      if (newf) {
        passedFilters.add(filterdict);
      }
      for (let singlefilter of passedFilters) {
        if (
          !newf &&
          singlefilter.prop === prop &&
          singlefilter.val === filterdict.val
        ) {
          slctdVal = true;
          passedFilters.delete(singlefilter);
          continue;
        }
        if (singlefilter.prop === prop) continue;
        else {
          url += "&" + singlefilter.prop + "=" + singlefilter.val;
          passedFilters.add(filterdict);
        }
      }
      if (!slctdVal) url += "&" + filterdict.prop + "=" + filterdict.val;
    }
    LoadData(url, pageid);
    return () => abortCont.abort();
  };
  useEffect(() => {
    const abortCont = new AbortController();
    if (data && data.length == 0) {
      setEmptyRes(true);
      return;
    }
    setEmptyRes(false);
    setData(data);
    return () => abortCont.abort();
  }, [data]);

  const handleReset = (e) => {
    const abortCont = new AbortController();
    e.preventDefault();
    LoadData(globalurl, pageid);
    return () => abortCont.abort();
  };
  const handleSearch = (e) => {
    const abortCont = new AbortController();
    e.preventDefault();
    LoadData(globalurl + "&q=" + searchval, pageid);
    return () => abortCont.abort();
  };

  return (
    <div className="home container-fluid">
      <div className="row my-3">
        <div className="col-md-7">
          <h2 className="title">
            Welcome to the <em>Employee Directory</em>
          </h2>
        </div>
        <div className="col-md-5">
          <form onSubmit={handleSearch}>
            <div className="d-flex">
              <input
                type="text"
                className="form-control w-50"
                placeholder="search"
                value={searchval}
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <button className="btn btn-dark w-25 mx-1">Search</button>
              <button
                className="btn btn-outline-dark w-25 mx-1"
                onClick={(e) => {
                  handleReset(e);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="list-content">
        {error && <div className="alert alert-danger">{error}</div>}
        {emptyres && (
          <div className="alert alert-info">The query returned no records</div>
        )}
        {isLoading && <div className="loading">Loading..</div>}
        {data && (
          <div className="row">
            <div className="col-md-9">
              <EmployeeList employees={data} />
            </div>
            <div className="col-md-3">
              {" "}
              <form className="mt-5">
                <div className="d-block">
                  <div className="form-label filter-by col-3 white-space-nowrap">
                    Departments:{" "}
                  </div>
                  {allDeps && (
                    <FilterButton
                      allVals={allDeps}
                      prop="department"
                      filter={filter}
                    />
                  )}
                </div>
                {/* 
                <div className="d-block my-3">
                  <div className="form-label filter-by col-3 white-space-nowrap">
                    Titles:
                  </div>

                  {allTitles && (
                    <FilterButton
                      allVals={allTitles}
                      prop="title"
                      filter={filter}
                    />
                  )}
                </div> */}

                <div className="d-block my-3">
                  <div className="form-label filter-by col-3 white-space-nowrap">
                    Countries:
                  </div>

                  {allCountries && (
                    <FilterButton
                      allVals={allCountries}
                      prop="country"
                      filter={filter}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
