const expressAsyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Category = require("../models/category");

const index = expressAsyncHandler(async (req, res, next) => {
    const items = await Item.find();
    const categories = await Category.find();
    res.render("index", { title: "Items", items, categories, });
});

const create_item_form = expressAsyncHandler(async (req, res, next) => {
    const categories = await Category.find();
    res.render("item_form", { categories });
});

const create_item = expressAsyncHandler(async (req, res, next) => {
    const { name, description, quantity, category } = req.body;
    const item = new Item({ name, description, quantity, category });
    await item.save();
    res.redirect(`/item/${item._id}`);
});

const get_item = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    res.render("item_detail", { item });
});

const update_item_form = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    const categories = await Category.find();
    res.render("item_form", { title: "Update", item, categories });
});

const update_item = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    const { name, description, quantity, category } = req.body;
    await Item.updateOne({ _id: itemId }, { name, description, quantity, category });
    res.redirect(`/item/${itemId}`);
});

const delete_item_confirmation = (req, res, next) => {
    res.render("item_delete");
};

const delete_item = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    await Item.findByIdAndDelete(itemId);
    res.redirect("/");
});

module.exports = { index, create_item_form, create_item, get_item, update_item_form, update_item, delete_item_confirmation, delete_item }