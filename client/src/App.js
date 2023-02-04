import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PopUp from './components/pop up/PopUp';
import Home from './components/home/Home';

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
            setIsActive = {setIsActive}
            submitEvent = {submitEvent}
          />
        }/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
