import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Option from "./Option";
const Create = () => {
  const [first_name, setFn] = useState("");
  const [last_name, setLn] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street_address, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [picture, setPicture] = useState("");
  const [about, setAbout] = useState("");
  const [department, setDep] = useState("Select");
  const [title, setTitle] = useState("Select");
  const [country, setCountry] = useState("Select");
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [allTitles, setAllTitles] = useState(null);
  const [allDeps, setAllDeps] = useState(null);
  const [allCountries, setAllCountries] = useState(null);
  const LoadData = (url) => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok)
          throw Error(
            "An error occurred while trying to fetch data for that url."
          );
        return res.json();
      })
      .then((data) => {
        const allDepsValues = [
          "Select",
          ...new Set(data.map((item) => item.department).sort()),
        ];
        setAllDeps(allDepsValues);
        const allCountriesValues = [
          "Select",
          ...new Set(data.map((item) => item.country).sort()),
        ];
        setAllCountries(allCountriesValues);
        const allTitlesValues = [
          "Select",
          ...new Set(data.map((item) => item.title).sort()),
        ];
        setAllTitles(allTitlesValues);
      });
  };

  useEffect(() => {
    const abortCont = new AbortController();
    LoadData("http://localhost:8000/results");
    return () => abortCont.abort();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsAlert(false);
    const employee = {
      first_name,
      last_name,
      email,
      phone,
      about,
      street_address,
      city,
      country,
      title,
      department,
      picture,
    };
    fetch("http://localhost:8000/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    }).then(() => {
      setIsLoading(false);
      ClearForm();
      setIsAlert(true);
      setTimeout(function () {
        setIsAlert(false);
      }, 2000);
    });
  };
  const ClearForm = () => {
    setFn("");
    setLn("");
    setEmail("");
    setPhone("");
    setAbout("");
    setStreet("");
    setCity("");
    setPicture("");
    setDep("Select");
    setTitle("Select");
    setCountry("Select");
    setIsLoading("");
  };
  return (
    <div className="update">
      <div className="home container-fluid">
        <div className="row my-3">
          <div className="col-md-10">
            <h2>Create a new Employee</h2>
            <form className="my-3" onSubmit={handleSubmit}>
              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">First Name</label>
                </div>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={first_name}
                    onChange={(e) => setFn(e.target.value)}
                  />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">Last Name</label>
                </div>
                <div className="col-md-9">
                  <input
                    className="form-control"
                    type="text"
                    required
                    value={last_name}
                    onChange={(e) => setLn(e.target.value)}
                  />
                </div>
              </div>

              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">About</label>
                </div>
                <div className="col-md-9">
                  <textarea
                    rows="4"
                    className="form-control"
                    required
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">Email</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">Phone</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">Picture</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                  />
                </div>
              </div>

              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">Title</label>
                </div>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    {allTitles && <Option allVals={allTitles} />}
                  </select>
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">Department</label>
                </div>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    required
                    value={department}
                    onChange={(e) => setDep(e.target.value)}
                  >
                    {allDeps && <Option allVals={allDeps} />}
                  </select>
                </div>
              </div>

              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">Street address</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={street_address}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>
              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">City</label>
                </div>
                <div className="col-md-9">
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="row my-1">
                <div className="col-md-3">
                  <label className="form-label">Country</label>
                </div>
                <div className="col-md-9">
                  <select
                    className="form-select"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {allCountries && <Option allVals={allCountries} />}
                  </select>
                </div>
              </div>
              <div className=" my-2">
                {!isLoading && (
                  <button className="btn btn-dark mx-1">Create</button>
                )}
                {isLoading && (
                  <button
                    disabled
                    className="btn btn-dark btn-disabled mx-1  my-2"
                  >
                    Creating..
                  </button>
                )}
                {isAlert && (
                  <div className="result-div my-2">
                    <div className="alert alert-success">
                      Created Successfully
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="col-md-2">
            <Link to="/" className="site-link">
              ← Back to list
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
