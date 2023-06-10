const expressAsyncHandler = require("express-async-handler");
const Category = require("../models/category");
const Item = require("../models/item");
const { body, validationResult } = require("express-validator");

const get_categories = expressAsyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.render("category_all", { title: "Categories", categories });
});

const create_category_form = (req, res, next) => {
    res.render("category_form", { title: "Create Category" });
};

const validateCategory = [
    body("name").notEmpty().withMessage("Name is required").isLength({ min: 5, max: 50 }).withMessage("Name must be between 10 and 50 characters").escape(),
    body("description").isLength({ min: 0, max: 500 }).withMessage("Description can't be greater than 500 characters").escape()
]

const create_category = [
    ...validateCategory,
    expressAsyncHandler(async (req, res, next) => {
        const { name, description } = req.body;
        const category = new Category({ name, description });
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.render("category_form", { title: "Create Category", errors: result.array(), category });
        }
        else {
            await category.save();
            res.redirect("/category");
        }
    })
]

const update_category_form = expressAsyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    res.render("category_form", { title: "Update Category", category });
});

const update_category = [
    ...validateCategory,
    expressAsyncHandler(async (req, res, next) => {
        const { categoryId } = req.params;
        const { name, description } = req.body;
        const category = new Category({ name, description, _id: categoryId });
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.render("category_form", { title: "Update Category", errors: result.array(), category })
        }
        else {
            await Category.findByIdAndUpdate({ _id: categoryId }, category, {});
            res.redirect("/category");
        }
    })
]

const delete_category_confirmation = expressAsyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    const items = await Item.find({ category: categoryId });
    res.render("category_delete", { title: "Delete Category", items });
});

const delete_category = expressAsyncHandler(async (req, res, next) => {
    const { categoryId } = req.params;
    await Category.deleteOne({ _id: categoryId });
    res.redirect("/category");
});

module.exports = { get_categories, create_category_form, create_category, update_category_form, update_category, delete_category_confirmation, delete_category };