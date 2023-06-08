const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");

const create_category_form = (req, res, next) => {
    res.render("category_form", { title: "Create Category" });
};

const create_category = expressAsyncHandler(async (req, res, next) => {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.redirect("/");
});

const update_category_form = expressAsyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    res.render("category_form", { title: "Update Category", category });
});

const update_category = expressAsyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    await Category.updateOne({ _id: categoryId }, { name, description });
    res.redirect("/");
});

const delete_category_confirmation = expressAsyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const items = await Item.find({ category: categoryId });
    res.render("category_delete", { title: "Delete Category", items });
});

const delete_category = expressAsyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    await Category.deleteOne({ _id: categoryId });
    res.redirect("/");
});

module.exports = { create_category_form, create_category, update_category_form, update_category, delete_category_confirmation, delete_category };