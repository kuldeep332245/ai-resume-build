const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model('Admin', AdminSchema);