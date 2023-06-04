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
const update_item = (req, res, next) => { };
const delete_item = (req, res, next) => { };

module.exports = { index, create_item, get_item, update_item, delete_item };