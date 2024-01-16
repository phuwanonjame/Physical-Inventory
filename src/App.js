import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Sitebar from "./component/sitebar";
import Inventory from "./component/Inventory";
import Receive from "./component/Receive";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <div>
              <div className=" flex">
                <div className="fixed">
                  <Navbar/>
                </div>
                <div className=" ml-60 pt-[navbar height]">
                  <Sitebar/>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Inventory" element={<Inventory />} />
                    <Route path="/Receive" element={<Receive />} />

                  </Routes>
                </div>
              </div>
            </div>
          }
        />
        <Route
          path="/system/*"
          element={
            <>
              {/* <Navbaradmin /> */}
              <Routes>{/* <Route path="/" element={<System />} /> */}</Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
