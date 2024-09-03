import { Route, Routes } from "react-router-dom";

import { LoginPage } from "@/pages/login";
import { EmployeeList } from "@/pages/employee-list";
import { EmployeeDetails } from "@/pages/employee-details";

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/" />
      <Route element={<EmployeeList />} path="/employee-list" />
      <Route element={<EmployeeDetails />} path="/employee-details" />
    </Routes>
  );
}

export default App;
