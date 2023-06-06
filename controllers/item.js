const expressAsyncHandler = require("express-async-handler");
const Item = require("../models/item");
const Category = require("../models/category");

const index = expressAsyncHandler(async (req, res, next) => {
    const items = await Item.find();
    const categories = await Category.find();
    res.render("index", { title: "Items", items, categories, });
});

const create_item = (req, res, next) => { };

const get_item = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    res.render("item_detail", { item });
});

const update_item_form = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    res.render("item_form", { title: "Update", item });
});

const update_item = expressAsyncHandler(async (req, res, next) => {
    const { itemId } = req.params;
    const { name, description, quantity } = req.body;
    await Item.updateOne({ _id: itemId }, { name, description, quantity });
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

module.exports = { index, create_item, get_item, update_item_form, update_item, delete_item_confirmation, delete_item }