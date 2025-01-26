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
  const [count, setCount] = useState(0)

  // so for the frontend, this is how we can fetch data from the backend
  // we hit the endpoint that we set in urls.py in the backend
  // and we get the data from the response
  // as you can see we use a native fetch function to do this
  useEffect(() => {   // we use useEffect to make the fetch call when the component mounts
    fetch('http://127.0.0.1:8000/test/') 
      .then((res) => res.json())
      .then((data) => setCount(data.new_count))   // and we set the count to the new_count that we get from the response
      .catch((err) => console.error(err));  // if there is an error we log it to the console
  }, []);


  // react setup will always be as follows:
  // we have a function component that returns JSX
  // we use useState to create state variables
  // we use useEffect to make fetch calls
  // we use the fetch function to make the fetch calls
  // we declare any other functions that we need
  // and then we return the JSX that we want to render
  return (
    <Router>
      {/*Nav bar goes here */}
      <Header/>

      <Routes>
        <Route path="/" element={<AccessCodeCard />}/>

        <Route path='/about' element={<About />} />

        <Route path='/CarouselExample' element={<CarouselExample/>} />
        
        <Route path='/api-doc' element={<SwaggerUI url="http://127.0.0.1:8000/static/openapi2.json" />} />
      </Routes>
    </Router>
  )
}

export default App
