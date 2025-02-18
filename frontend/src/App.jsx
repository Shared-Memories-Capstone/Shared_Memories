import Header from './components/Header.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccessCodeCard from './components/AccessCodeCard.jsx';
import About from './components/About.jsx'
import CarouselExample from './components/CarouselExample.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import LoginForm from './components/LoginForm.jsx';
import NewUser from './components/NewUser.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateEventForm from './components/CreateEventForm';
import EventPage from './components/EventPage.jsx';
import EventManager from './components/EventManager.jsx';
// Use Vite's env variable (make sure it’s prefixed with VITE_)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function App() {

  return (
    <Router>
      <Header/>

      <Routes>
        {/* Public routes */}
        <Route path='/login' element={<LoginForm />} />
        <Route path='/newuser' element={<NewUser />} />

        <Route path="/" element={
          <ProtectedRoute fallback={<AccessCodeCard />}>
            <EventManager />
          </ProtectedRoute>
        }/>
        <Route path='/about' element={
            <About />
        } />
        <Route path='/CarouselExample' element={
            <CarouselExample/>
        } />
       {/* Protected routes */}
        <Route path='/api-doc' element={
          <ProtectedRoute>
            <SwaggerUI url={`${API_URL}/schema/`} />
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
        <Route
          path="/event-manager"
          element={
            <ProtectedRoute>
              <EventManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-event/:eventId"
          element={
            <ProtectedRoute>
              <CreateEventForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-page"
          element={
              <EventPage />
          }
        />

      </Routes>
    </Router>
  )
}

export default App
