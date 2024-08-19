import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users/Users';
import NavBar from './components/NavBar/NavBar';
import Register from './components/Register/Register';
import Signin from './components/Signin/SignIn';
import Home from './components/Home/Home';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cities"
          element={
            <ProtectedRoute>
              <>Cities Route</>
            </ProtectedRoute>
          }
        />
        <Route
          path="/countries"
          element={
            <ProtectedRoute>
              <>Countries Route</>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
