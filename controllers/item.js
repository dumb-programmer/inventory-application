const index = (req, res, next) => {
    const items = [
        { id: 1, name: "Milk" },
        { id: 2, name: "Carrot" },
        { id: 3, name: "Banana" },
        { id: 4, name: "Mango" },
        { id: 1, name: "Masala" },
    ];
    const categories = ["Vegetables", "Fruits", "Electronics", "Clothing"];
    res.render("index", { title: "Items", items, categories, });
};

const create_item = (req, res, next) => { };
const get_item = (req, res, next) => {
    res.render("item_detail");
};
const update_item_form = (req, res, next) => {
    res.render("item_form", { title: "Update" });
}
const update_item = (req, res, next) => {
    console.log("Updating item");
    res.render("item_detail");
};
const delete_item_confirmation = (req, res, next) => {
    res.render("item_delete");
};
const delete_item = (req, res, next) => {
    console.log("Deleting item");
    res.redirect("/");
};

module.exports = { index, create_item, get_item, update_item_form, update_item, delete_item_confirmation, delete_item };