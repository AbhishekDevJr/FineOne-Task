import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users/Users';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<>Home Route</>} />
        <Route path='/users' element={<Users />} />
        <Route path='/cities' element={<>Cities Route</>} />
        <Route path='/countries' element={<>Countries Route</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
