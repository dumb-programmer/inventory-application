const expressAsyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const ObjectId = require("mongoose").Types.ObjectId;

const index = expressAsyncHandler(async (req, res, next) => {
    const items = await Item.find();
    const categories = await Category.find();
    res.render("index", { title: "Items", items, categories, });
});

const create_item_form = expressAsyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.render("item_form", { categories });
});

const validateItem = [
    body("name").notEmpty().withMessage("Name is required").isLength({ min: 3, max: 50 }).withMessage("Name must be between 10 and 50 characters").escape(),
    body("description").isLength({ min: 0, max: 500 }).withMessage("Description can't be greater than 500 characters").escape(),
    body("quantity").notEmpty().withMessage("Quantity is required").isInt({ min: 0, }).withMessage("Quantity must be non-negative").escape(),
    body("category").notEmpty().withMessage("Category is required").custom(async value => {
        if (ObjectId.isValid(value)) {
            const category = await Category.findOne({ _id: value });
            if (category === null) {
                console.log("Hello");
                return Promise.reject(false);
            }
            return true;
        }
        return Promise.reject(false);
    }).withMessage("No such category exists").escape(),
]

const create_item = [
    ...validateItem,
    expressAsyncHandler(async (req, res, next) => {
        const result = validationResult(req);
        const { name, description, quantity, category } = req.body;
        const item = new Item({ name, description, quantity, category });
        if (!result.isEmpty()) {
            const categories = await Category.find();
            res.render("item_form", { title: "Create Item", errors: result.array(), categories, item });
        }
        else {
            await item.save();
            res.redirect(`/item/${item._id}`);
        }
    })
]

const get_item = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    res.render("item_detail", { item });
});

const update_item_form = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    const categories = await Category.find();
    res.render("item_form", { title: "Update Item", item, categories });
});

const update_item = [
    ...validateItem,
    expressAsyncHandler(async (req, res, next) => {
        const { itemId } = req.params;
        const { name, description, quantity, category } = req.body;
        const item = new Item({ name, description, quantity, category, _id: itemId });
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const categories = await Category.find();
            res.render("item_form", { title: "Update Item", errors: result.array(), categories, item });
        }
        else {
            await Item.findByIdAndUpdate({ _id: itemId }, item, {});
            res.redirect(`/item/${itemId}`);
        }
    })
]

const delete_item_confirmation = (req, res, next) => {
    res.render("item_delete");
};

const delete_item = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    await Item.findByIdAndDelete(itemId);
    res.redirect("/");
});

module.exports = { index, create_item_form, create_item, get_item, update_item_form, update_item, delete_item_confirmation, delete_item }