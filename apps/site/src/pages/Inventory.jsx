import { useState, useEffect } from 'react'
import {
  FiGrid, FiList,
  FiEdit2, FiTrash2, FiCheck, FiX, FiEdit,
  FiChevronLeft, FiChevronRight,
  FiNavigation, FiDroplet, FiSettings, FiRotateCw,
} from 'react-icons/fi'
import VehicleForm from '../components/VehicleForm.jsx'
import { API_BASE, authHeaders } from '../api/config.js'

const EMPTY_EDIT = {
  make: '', model: '', year: '', price: '', mileage: '', color: '',
  transmission: 'Automatic', drivetrain: 'FWD',
}

function Inventory() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [view, setView] = useState('grid')
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState(EMPTY_EDIT)
  const [saving, setSaving] = useState(false)

  const fetchVehicles = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/vehicles`, { headers: authHeaders() })
      if (!res.ok) throw new Error('Failed to fetch vehicles')
      const data = await res.json()
      setVehicles(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchVehicles() }, [])

  const handlePerPageChange = (e) => {
    setPerPage(Number(e.target.value))
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(vehicles.length / perPage))
  const paginated = vehicles.slice((page - 1) * perPage, page * perPage)

  const handleDelete = async (id) => {
    if (!confirm('Delete this vehicle?')) return
    try {
      const res = await fetch(`${API_BASE}/api/vehicles/${id}`, { method: 'DELETE', headers: authHeaders() })
      if (!res.ok) throw new Error('Delete failed')
      setVehicles((prev) => prev.filter((v) => v._id !== id))
      if (paginated.length === 1 && page > 1) setPage((p) => p - 1)
    } catch (err) {
      alert(err.message)
    }
  }

  const startEdit = (vehicle) => {
    setEditingId(vehicle._id)
    setEditForm({
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      mileage: vehicle.mileage,
      color: vehicle.color,
      transmission: vehicle.transmission,
      drivetrain: vehicle.drivetrain,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm(EMPTY_EDIT)
  }

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleEditSave = async (id) => {
    setSaving(true)
    try {
      const res = await fetch(`${API_BASE}/api/vehicles/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({
          ...editForm,
          year: Number(editForm.year),
          price: Number(editForm.price),
          mileage: Number(editForm.mileage),
        }),
      })
      if (!res.ok) throw new Error('Update failed')
      const updated = await res.json()
      setVehicles((prev) => prev.map((v) => (v._id === id ? updated : v)))
      cancelEdit()
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Shared inline edit form ──────────────────────────────────
  const EditFormFields = ({ id }) => (
    <div className="inline-edit-form">
      <p className="edit-label"><FiEdit /> Editing vehicle</p>
      <div className="edit-row">
        <input type="number" name="year" placeholder="Year" value={editForm.year} onChange={handleEditChange} />
        <input type="text" name="make" placeholder="Make" value={editForm.make} onChange={handleEditChange} />
        <input type="text" name="model" placeholder="Model" value={editForm.model} onChange={handleEditChange} />
      </div>
      <div className="edit-row">
        <input type="number" name="price" placeholder="Price" value={editForm.price} onChange={handleEditChange} />
        <input type="number" name="mileage" placeholder="Mileage" value={editForm.mileage} onChange={handleEditChange} />
        <input type="text" name="color" placeholder="Color" value={editForm.color} onChange={handleEditChange} />
      </div>
      <div className="edit-row">
        <select name="transmission" value={editForm.transmission} onChange={handleEditChange}>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
        <select name="drivetrain" value={editForm.drivetrain} onChange={handleEditChange}>
          <option value="FWD">FWD</option>
          <option value="RWD">RWD</option>
          <option value="AWD">AWD</option>
          <option value="4WD">4WD</option>
        </select>
      </div>
      <div className="card-actions">
        <button className="btn btn-save" onClick={() => handleEditSave(id)} disabled={saving}>
          <FiCheck className="btn-icon" /> {saving ? 'Saving...' : 'Save'}
        </button>
        <button className="btn btn-cancel" onClick={cancelEdit}>
          <FiX className="btn-icon" /> Cancel
        </button>
      </div>
    </div>
  )

  // ── Spec pills (grid card) ────────────────────────────────────
  const SpecPills = ({ vehicle }) => (
    <div className="card-specs">
      <span><FiNavigation className="spec-icon" /> {vehicle.mileage.toLocaleString()} mi</span>
      <span><FiDroplet className="spec-icon" /> {vehicle.color}</span>
      <span><FiSettings className="spec-icon" /> {vehicle.transmission}</span>
      <span><FiRotateCw className="spec-icon" /> {vehicle.drivetrain}</span>
    </div>
  )

  return (
    <main className="page inventory-page">
      <div className="container">
        <h1>Vehicle Inventory</h1>

        <VehicleForm onAdded={fetchVehicles} />

        {/* ── Toolbar ─────────────────────────────────────── */}
        <div className="inventory-toolbar">
          <p className="toolbar-count">
            {loading ? 'Loading...' : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''}`}
          </p>
          <div className="toolbar-controls">
            <label className="per-page-label">
              Show
              <select value={perPage} onChange={handlePerPageChange} className="per-page-select">
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              per page
            </label>
            <div className="view-toggle">
              <button
                className={`view-btn ${view === 'grid' ? 'active' : ''}`}
                onClick={() => setView('grid')}
                title="Grid view"
              >
                <FiGrid />
              </button>
              <button
                className={`view-btn ${view === 'list' ? 'active' : ''}`}
                onClick={() => setView('list')}
                title="List view"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {error && <p className="status-msg error">{error}</p>}
        {!loading && !error && vehicles.length === 0 && (
          <p className="status-msg">No vehicles yet. Add one above.</p>
        )}

        {/* ── Grid View ───────────────────────────────────── */}
        {view === 'grid' && (
          <div className="vehicle-grid">
            {paginated.map((vehicle) => (
              <div key={vehicle._id} className={`vehicle-card ${editingId === vehicle._id ? 'is-editing' : ''}`}>
                {editingId === vehicle._id ? (
                  <EditFormFields id={vehicle._id} />
                ) : (
                  <>
                    <div className="card-body">
                      <h2 className="card-title">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
                      <p className="card-price">${vehicle.price.toLocaleString()}</p>
                      <SpecPills vehicle={vehicle} />
                      <p className="card-id">ID: {vehicle._id}</p>
                      <p className="card-date">Added: {new Date(vehicle.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="card-actions">
                      <button className="btn btn-edit" onClick={() => startEdit(vehicle)}>
                        <FiEdit2 className="btn-icon" /> Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(vehicle._id)}>
                        <FiTrash2 className="btn-icon" /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── List View ───────────────────────────────────── */}
        {view === 'list' && (
          <div className="vehicle-list">
            {paginated.map((vehicle) => (
              <div key={vehicle._id} className={`vehicle-list-item ${editingId === vehicle._id ? 'is-editing' : ''}`}>
                {editingId === vehicle._id ? (
                  <EditFormFields id={vehicle._id} />
                ) : (
                  <>
                    <div className="list-main">
                      <h2 className="list-title">{vehicle.year} {vehicle.make} {vehicle.model}</h2>
                      <div className="list-meta">
                        <span><strong>ID:</strong> {vehicle._id}</span>
                        <span><FiNavigation className="spec-icon" /> {vehicle.mileage.toLocaleString()} mi</span>
                        <span><FiDroplet className="spec-icon" /> {vehicle.color}</span>
                        <span><FiSettings className="spec-icon" /> {vehicle.transmission}</span>
                        <span><FiRotateCw className="spec-icon" /> {vehicle.drivetrain}</span>
                        <span>Added: {new Date(vehicle.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="list-right">
                      <p className="list-price">${vehicle.price.toLocaleString()}</p>
                      <div className="card-actions">
                        <button className="btn btn-edit" onClick={() => startEdit(vehicle)}>
                          <FiEdit2 className="btn-icon" /> Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(vehicle._id)}>
                          <FiTrash2 className="btn-icon" /> Delete
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Pagination ──────────────────────────────────── */}
        {!loading && vehicles.length > 0 && (
          <div className="pagination">
            <button
              className="btn btn-cancel"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <FiChevronLeft /> Prev
            </button>
            <span className="page-info">Page {page} of {totalPages}</span>
            <button
              className="btn btn-cancel"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Inventory
