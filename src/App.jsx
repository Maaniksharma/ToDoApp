import Mainpage from './Mainpage.jsx';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import NavBar from './components/Navbar.jsx';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const App = () => (
  <div>
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage/:name" element={<Mainpage />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
