import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';

import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

import Home from './pages/Home/Home';
import Direct from './pages/Direct/Direct';
import Podcasts from './pages/Podcasts/Podcasts';
import Show from './pages/Show/Show';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Admin from './pages/Admin/Admin';

import ProtectedRoute from './components/common/ProtectedRoute/ProtectedRoute';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/direct" element={<Direct />} />
                <Route path="/podcasts" element={<Podcasts />} />
                <Route path="/show/:slug" element={<Show />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <AudioPlayer />
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;