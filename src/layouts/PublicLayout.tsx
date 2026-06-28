import { Outlet } from "react-router";

import Navbar from "../components/Navbar";
import Aos from "../components/Aos";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <div className="app">
      {" "}
      {}
      <Aos />
      <Navbar />
      <main>
        {" "}
        {}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
