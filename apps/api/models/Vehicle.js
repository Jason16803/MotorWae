import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  transmission: {
    type: String,
    enum: ["Automatic", "Manual", "Electric"],
    default: "Automatic",
  },
  drivetrain: {
    type: String,
    enum: ["FWD", "RWD", "AWD", "4WD"],
    default: "FWD",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
