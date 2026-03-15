import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const EMPTY_FORM = {
  make: '',
  model: '',
  year: '',
  price: '',
  mileage: '',
  color: '',
  transmission: 'Automatic',
  drivetrain: 'FWD',
}

function VehicleForm({ onAdded }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
        }),
      })
      if (!res.ok) throw new Error('Failed to add vehicle')
      setForm(EMPTY_FORM)
      onAdded()
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-card">
      <h2>Add a Vehicle</h2>
      {error && <p className="status-msg error">{error}</p>}
      <div className="vehicle-form">
        <div className="form-row">
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            min="1900"
            max="2099"
          />
          <input
            type="text"
            name="make"
            placeholder="Make (e.g. Toyota)"
            value={form.make}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            placeholder="Model (e.g. Camry)"
            value={form.model}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="number"
            name="price"
            placeholder="Price ($)"
            value={form.price}
            onChange={handleChange}
            min="0"
          />
          <input
            type="number"
            name="mileage"
            placeholder="Mileage"
            value={form.mileage}
            onChange={handleChange}
            min="0"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={form.color}
            onChange={handleChange}
          />
        </div>
        <div className="form-row form-row--selects">
          <select name="transmission" value={form.transmission} onChange={handleChange}>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <select name="drivetrain" value={form.drivetrain} onChange={handleChange}>
            <option value="FWD">FWD</option>
            <option value="RWD">RWD</option>
            <option value="AWD">AWD</option>
            <option value="4WD">4WD</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Adding...' : <><FiPlus className="btn-icon" /> Add Vehicle</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default VehicleForm
