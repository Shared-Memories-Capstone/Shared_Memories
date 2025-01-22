import Header from './components/Header.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccessCodeCard from './components/AccessCodeCard.jsx';
import About from './components/About.jsx'
import CarouselExample from './components/CarouselExample.jsx'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <Router>
      {/*Nav bar goes here */}
      <Header/>

      <Routes>
        <Route path="/" element={<AccessCodeCard />}/>

        <Route path='/about' element={<About />} />

        <Route path='/CarouselExample' element={<CarouselExample/>} />

      </Routes>
    </Router>
  )
}

export default App
