let mongoose = require("mongoose");

let taskSchema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("lists", taskSchema);
