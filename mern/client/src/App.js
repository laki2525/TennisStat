import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min" 
import Home from "./components/Home";
import Player from "./components/Player";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import AddMatch from "./components/AddMatch";
import AddPlayer from "./components/AddPlayer";
import Tournament from "./components/Tournament";
import UpdatePlayer from "./components/UpdatePlayer";

 
const App = () => {
    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="telo">
                <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Player" element={<Player />} />
                <Route path="/AddMatch" element={<AddMatch />} />
                <Route path="/AddPlayer" element={<AddPlayer />} />
                <Route path="/Tournament" element={<Tournament />} />
                <Route path="/UpdatePlayer" element={<UpdatePlayer />} />
                </Routes>
            </div> 
        </div>
    );
};

export default App;
