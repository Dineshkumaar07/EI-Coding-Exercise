const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  priority: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

TaskSchema.index({ startTime: 1, endTime: 1 }, { unique: true });

module.exports = mongoose.model('Task', TaskSchema);
