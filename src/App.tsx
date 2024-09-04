import { Route, Routes } from "react-router-dom";

import { EmployeeDetailsPageEdit } from "./pages/employee-details/edit";

import { EmployeeDetailsPage } from "@/pages/employee-details/employee-details";
import { EmployeeList } from "@/pages/employee-list";
import { LoginPage } from "@/pages/login";

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
    </Routes>
  );
}

export default App;
