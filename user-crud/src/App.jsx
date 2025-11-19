import "./App.css";
import Navbar from "./components/Navbar";
import UserDetail from "./pages/UserDetail/UserDetail";
import CreateUser from "./pages/UserForm/CreateUser";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<UserDetail />} />
        <Route path="/create-user" element={<CreateUser />} />
      </Routes>
    </>
  );
}

export default App;
