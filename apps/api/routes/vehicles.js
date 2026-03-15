import express from "express";
import Vehicle from "../models/Vehicle.js";

const router = express.Router();

// GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ created_at: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single vehicle
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create vehicle
router.post("/", async (req, res) => {
  try {
    const { make, model, year, price, mileage, color, transmission, drivetrain } = req.body;
    const vehicle = new Vehicle({ make, model, year, price, mileage, color, transmission, drivetrain });
    const saved = await vehicle.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update vehicle
router.put("/:id", async (req, res) => {
  try {
    const { make, model, year, price, mileage, color, transmission, drivetrain } = req.body;
    const updated = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { make, model, year, price, mileage, color, transmission, drivetrain },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Vehicle not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE vehicle
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
