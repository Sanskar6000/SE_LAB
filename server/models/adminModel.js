const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// Compiling Schema into a Model(A model is a class with which we construct documents. )
module.exports = mongoose.model('Admin', adminSchema);