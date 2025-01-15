import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
