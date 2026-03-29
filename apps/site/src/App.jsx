import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Inventory from './pages/Inventory.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import { isLoggedIn } from './api/auth.js'

// Redirects to /login if no token is present
function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
