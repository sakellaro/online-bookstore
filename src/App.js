import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {
            <div>
              Hello
            </div>
          }/>
      </Routes>
    </Router>
  );
}

export default App;
