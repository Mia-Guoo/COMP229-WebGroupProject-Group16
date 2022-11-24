const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Incident = new Schema(
  {
    name: {
      type: String,
    },
    date: {
      type: String,
    },
    narrative: {
      type: String,
    },
    priority: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    collection: "incidents",
  }
);

module.exports = mongoose.model("Incident", Incident);
