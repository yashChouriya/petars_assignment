import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Signup from './components/signup';
import Login from './components/login';
import ViewDoc from './components/viewDoc';
import EditDoc from './components/editDoc';
import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const getText = (text) => {
    setText(text);
  }
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/document/view/:id" exact element={<ViewDoc viewText={text}/>} />
          <Route path="/document/edit/:id" exact element={<EditDoc getText={getText}/>} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
