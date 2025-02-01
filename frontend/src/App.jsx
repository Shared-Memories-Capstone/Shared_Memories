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

function App() {

  return (
    <Router>
      {/*Nav bar goes here */}
      <Header/>

      <Routes>
        <Route path="/" element={<AccessCodeCard />}/>

        <Route path='/about' element={<About />} />

        <Route path='/login' element={<LoginForm />} />

        <Route path='/CarouselExample' element={<CarouselExample/>} />

        <Route path='/newuser' element={<NewUser/>} />

        <Route path='/api-doc' element={
          <SwaggerUI url="http://localhost:8000/api/schema/" />
        } />
      </Routes>
    </Router>
  )
}

export default App
