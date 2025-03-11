import React from 'react';
import './App.css';
import Header from "./components/Header";
import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import GamesPage from "./pages/games/GamesPage";
import GameDetailPage from "./pages/gameDetail/GameDetailPage";
import DevelopersPage from "./pages/developers/DevelopersPage";
import {DeveloperDetailPage} from "./pages/developerDetail/DeveloperDetailPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
            <Route path="/games/:id" element={<GameDetailPage/>}/>
            <Route path="/developers" element={<DevelopersPage/>}/>
            <Route path="/developers/:id" element={<DeveloperDetailPage/>}/>
            <Route path="/*" element={<h2 className="text-danger">Not found</h2>}/>
        </Routes>
      </Container>
    </div>
  );
}
export default App;
