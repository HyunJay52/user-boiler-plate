import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Auth from './hoc/auth'

function App() {
  
  const LandingP = Auth(LandingPage, null);
  const LoginP = Auth(LoginPage, false);
  const RegisterP = Auth(RegisterPage, false);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingP />} />
        <Route exact path="/login" element={<LoginP />} />
        <Route exact path="/register" element={<RegisterP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
