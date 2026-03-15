import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import { MdDirectionsCar } from 'react-icons/md'

function Home() {
  return (
    <main className="page home-page">
      <div className="hero-content">
        <MdDirectionsCar className="hero-icon" />
        <p className="hero-eyebrow">Welcome to</p>
        <h1 className="hero-title">MotorWae</h1>
        <p className="hero-subtitle">Find and manage vehicles easily.</p>
        <Link to="/inventory" className="btn btn-primary">
          Browse Inventory <FiArrowRight className="btn-icon" />
        </Link>
      </div>
    </main>
  )
}

export default Home
