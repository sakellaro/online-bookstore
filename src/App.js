import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PopUp from './components/pop up/PopUp';

function App() {

  /*    Pop Up     */

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
      />}

      <Header
        openPopUp = {openPopUp}
      />
      <Footer/>

      <Routes>
        <Route path="/" element = {
          <>
            
          </>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
