import Appbar from "../components/Appbar";

import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ marginBottom: "10PX" }}></div>
      <Appbar />
      <Outlet />
    </div>
  );
};

export default Home;
