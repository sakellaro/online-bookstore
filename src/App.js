import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {
          <>
            <Header/>
            <Footer/>
          </>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
