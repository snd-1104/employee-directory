import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./Create";
import EmployeeDetails from "./EmployeeDetails";
import NotFound from "./NotFound";
function App() {
  return (
    <Router>
      <div className="App container-fluid">
        <Navbar />
        <div className="">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/create" element={<Create />}></Route>
            <Route
              exact
              path="/details/:id"
              element={<EmployeeDetails />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
