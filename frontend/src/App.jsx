import Header from './components/Header.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccessCodeCard from './components/AccessCodeCard.jsx';
import About from './components/About.jsx'
import GalleryCarousel from './components/GalleryCarousel.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import LoginForm from './components/LoginForm.jsx';
import NewUser from './components/NewUser.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateEventForm from './components/CreateEventForm';

function App() {

  return (
    <Router>
      <Header/>

      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<LoginForm />} />
        <Route path='/newuser' element={<NewUser />} />

        <Route path="/" element={
            <AccessCodeCard />
        }/>
        <Route path='/about' element={
            <About />
        } />
        {/* Code and URL accessed Protected routes */}
        <Route path='/GalleryCarousel' element={
            <GalleryCarousel/>
        } />
       {/* Authorized Protected routes */}
        <Route path='/api-doc' element={
          <ProtectedRoute>
            <SwaggerUI url="http://localhost:8000/api/schema/" />
          </ProtectedRoute>
        } />
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEventForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
