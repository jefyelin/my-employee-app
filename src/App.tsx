import { Route, Routes } from "react-router-dom";

import { LoginPage } from "@/pages/login";

function App() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/" />
    </Routes>
  );
}

export default App;
