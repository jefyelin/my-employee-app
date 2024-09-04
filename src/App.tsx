import { Route, Routes } from "react-router-dom";

import { EmployeeDetailsPageEdit } from "./pages/employee-details/edit";

import { EmployeeDetailsPage } from "@/pages/employee-details";
import { EmployeeList } from "@/pages/employee-list";
import { LoginPage } from "@/pages/login";
import { NewEmployeePage } from "@/pages/new-employee";

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/" />
      <Route element={<EmployeeList />} path="/employee-list" />
      <Route element={<EmployeeDetailsPage />} path="/employee-details" />
      <Route
        element={<EmployeeDetailsPageEdit />}
        path="/employee-details/edit"
      />
      <Route element={<NewEmployeePage />} path="/new-employee" />
    </Routes>
  );
}

export default App;
