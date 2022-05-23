import { Link } from "react-router-dom";
const EmployeeList = ({ employees, title }) => {
  return (
    <div className="employee-list">
      <div className="text-end my-2">
        <Link to="/create" className="btn btn-success">
          Create New
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Title</th>
            <th>Department</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="td-image">
                <div className="img-container">
                  {" "}
                  <Link className="site-link" to={"/details/" + employee.id}>
                    <img
                      src={employee.picture}
                      alt={employee.first_name}
                      className="img-fluid list-img"
                    />
                  </Link>{" "}
                </div>
              </td>
              <td>
                <Link className="site-link" to={"/details/" + employee.id}>
                  {employee.first_name} {employee.last_name}
                </Link>
              </td>
              <td>{employee.title}</td>
              <td>{employee.department}</td>
              <td>{employee.country}</td>
              <td className="text-center">
                {" "}
                <Link className="site-link" to={"/details/" + employee.id}>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
