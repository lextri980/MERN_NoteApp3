const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LinkCardSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    enum: ["TO LEARN", "LEARNING", "LEARNED"]
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:'users'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("linkcards", LinkCardSchema);
