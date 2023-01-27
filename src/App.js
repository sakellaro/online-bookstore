import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {
            <Header/>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
