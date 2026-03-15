import { Link, NavLink } from 'react-router-dom'
import { MdDirectionsCar } from 'react-icons/md'
import { FiHome, FiTruck } from 'react-icons/fi'

function Navbar() {
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
      </ul>
    </nav>
  )
}

export default Navbar
