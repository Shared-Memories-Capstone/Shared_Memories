import Header from './components/Header.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import AccessCodeCard from './components/AccessCodeCard.jsx';
import About from './components/About.jsx'
import CarouselExample from './components/CarouselExample.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function App() {

  return (
    <Router>
      {/*Nav bar goes here */}
      <Header/>

      <Routes>
        <Route path="/" element={<AccessCodeCard />}/>

        <Route path='/about' element={<About />} />

        <Route path='/CarouselExample' element={<CarouselExample/>} />

        <Route path='/api-doc' element={<SwaggerUI url="http://127.0.0.1:8000/static/openapi.yaml" />} />
      </Routes>
    </Router>
  )
}

export default App
