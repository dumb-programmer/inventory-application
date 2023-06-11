const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Item = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    image: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
});

Item.virtual("url").get(() => `/item/${this._id}`);

module.exports = mongoose.model("Item", Item);