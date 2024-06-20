import { Route, Routes, BrowserRouter } from "react-router-dom";
import Reading from "./pages/Reading";
import Home from "./pages/Home";

import LoginForm from "./pages/Auth/Login";
import ProtectedRoute from "./components/Private";
import Users from "./pages/Users";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<LoginForm />}></Route>

          <Route
            path="/readings"
            element={
              <ProtectedRoute>
                <Reading />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/users" element={<Users/>} >



          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
