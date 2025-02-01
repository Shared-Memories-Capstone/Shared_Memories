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
        <Route path='/CarouselExample' element={
            <CarouselExample/>
        } />
       {/* Protected routes */}
        <Route path='/api-doc' element={
          <ProtectedRoute>
            <SwaggerUI url="http://localhost:8000/api/schema/" />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
