const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Category = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
});

Category.virtual("url").get(() => `/category/${this.name}`);

module.exports = mongoose.model("Category", Category);