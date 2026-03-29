import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdDirectionsCar } from 'react-icons/md'
import { FiHome, FiTruck, FiLogOut } from 'react-icons/fi'
import { isLoggedIn, removeToken } from '../api/auth.js'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeToken()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <MdDirectionsCar className="brand-icon" />
        Motor<span>Wae</span>
      </Link>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            <FiHome />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/inventory" className={({ isActive }) => isActive ? 'active' : ''}>
            <FiTruck />
            Inventory
          </NavLink>
        </li>
        {isLoggedIn() && (
          <li>
            <button className="navbar-logout" onClick={handleLogout}>
              <FiLogOut />
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
