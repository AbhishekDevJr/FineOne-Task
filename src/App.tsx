import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users/Users';
import NavBar from './components/NavBar/NavBar';
import Register from './components/Register/Register';
import Signin from './components/Signin/SignIn';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/' element={<>Home Route</>} />
        <Route path='/users' element={<Users />} />
        <Route path='/cities' element={<>Cities Route</>} />
        <Route path='/countries' element={<>Countries Route</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
