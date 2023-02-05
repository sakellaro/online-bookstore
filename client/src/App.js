import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PopUp from './components/pop up/PopUp';
import Home from './components/home/Home';
import Book from './components/book/Book'

function App() {

  // Variable that counts submissions from popUp while we are on the home page.
  // We need this variable in order to trigger the useEffect hook on the home page, 
  // everytime a submission is made.
  const [submitEvent, setSubmitEvent] = useState(()=>{
    return 0
  })

  // Variable that checks if we are on the home page so that the home menu item is colored
  const [isActive, setIsActive] = useState(()=>{
    return true
  })

  // Pop Up

  const [popUp, setPopUp] = useState(()=>{
    return false
  })

  function openPopUp() {
    setPopUp(true)
  }

  function closePopUp() {
    setPopUp(false);
  }


  // Books
  const [books, setBooks] = useState(()=>{
    return []
  })

  // Check if the server response is ok
  const [serverResponse, setServerResponse] = useState(()=>{
    return true
  })

  // Fetch data
  useEffect( () => {
    async function fetchData() {
      const response = await fetch("/books")
      if (response.ok) {
          setServerResponse(true)
          const data = await response.json()

          // This condition is because we want the useEffect hook to be triggered
          // only when the database is updated
          if (books.length !== data.length) setBooks(data)
      }
      else setServerResponse(false)
    }
      fetchData();
  }, [books, submitEvent] )

  return (
    <Router>

      {popUp && <PopUp
        closePopUp = {closePopUp}
        setSubmitEvent = {setSubmitEvent}
      />}

      <Header
        openPopUp = {openPopUp}
        isActive = {isActive}
      />
      <Routes>
        <Route path="/" element = {
          <Home
            books = {books}
            setIsActive = {setIsActive}
            serverResponse = {serverResponse}
          />
        }/>
        <Route path="/:id" element = {
          <Book
            setIsActive = {setIsActive}
            books = {books}
          />
        }/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
