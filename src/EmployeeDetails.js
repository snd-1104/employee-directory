import { useNavigate, useParams, Link } from "react-router-dom";
import useFetch from "./useFetch";
import { useState } from "react";
import Update from "./Update";
const EmployeeDetails = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const {
    data: employee,
    error,
    isPending,
  } = useFetch("http://localhost:8000/results/" + id);
  const navigate = useNavigate();
  const handleDelete = () => {
    fetch("http://localhost:8000/results/" + employee.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };
  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <div className="employee-details">
      {isPending && <div className="">Loading..</div>}
      {error && <div className="">{error}</div>}
      {isEdit && (
        <div className="edit-container">
          <Update item={employee}></Update>
        </div>
      )}
      {!isEdit && employee && (
        <div className="home container-fluid">
          <div className="row my-3">
            <div className="col-md-8">
              <h2 className="title">
                {employee.first_name} {employee.last_name}
              </h2>
            </div>
            <div className="col-md-4 text-end">
              <Link to="/" className="site-link">
                ← Back to list
              </Link>
            </div>
            <div className="col-md-8">
              <div className="info">
                {employee.title} - {employee.department}
              </div>
              <p className="p-text">{employee.about}</p>
              <ul className="contact-info">
                <li>
                  <b>T:</b>{" "}
                  <a href={"tel:" + employee.phone}>{employee.phone}</a>
                </li>
                <li>
                  <b>E:</b>{" "}
                  <a href={"mailto:" + employee.email}>{employee.email}</a>
                </li>
                <li>
                  <b>A:</b> {employee.street_address}, {employee.city},{" "}
                  {employee.country}
                </li>
              </ul>
            </div>
            <div className="col-md-4 text-end">
              <img
                src={employee.picture}
                alt={employee.first_name}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      )}

      {!isEdit && (
        <div className="container-fluid">
          <button className="btn btn-dark mx-1" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn btn-danger mx-1" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
