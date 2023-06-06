#! /usr/bin/env node

console.log(
    'This script populates some test items and categories"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function categoryCreate(name) {
    const category = new Category({ name: name });
    await category.save();
    categories.push(category);
    console.log(`Added category: ${name}`);
}

async function itemCreate(name, description, category) {
    const itemDetails = {
        name,
        description,
    };
    itemDetails.category = category;
    const item = new Item(itemDetails);
    await item.save();
    items.push(item);
    console.log(`Added item: ${item}`);
}

async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
        categoryCreate("Produce"),
        categoryCreate("Beverages"),
        categoryCreate("Snacks and Sweets"),
    ]);
}

async function createItems() {
    console.log("Adding Items");
    await Promise.all([
        itemCreate(
            "Apples",
            "Fresh and delicious apples available in various varieties, perfect for healthy snacking and culinary creations.",
            categories[0]
        ),
        itemCreate(
            "Mangoes",
            "Experience the luscious sweetness, vibrant colors, and aromatic flavors of these juicy fruits. Whether enjoyed fresh, blended into smoothies, or used in exotic recipes, mangoes bring a taste of paradise to your palate. Discover a wide selection of premium mango varieties, hand-picked for ultimate ripeness. Bring home the essence of summer with our mouthwatering mangoes.",
            categories[0]
        ),
        itemCreate(
            "Pineapples",
            "Known for their juicy sweetness and vibrant golden hue, pineapples are a true delight for your senses. Whether enjoyed fresh, grilled, or incorporated into your favorite recipes, these tropical fruits bring a burst of flavor to every bite. Rich in vitamins, minerals, and bromelain enzymes, pineapples offer a refreshing and healthful addition to your diet. At our grocery store, you'll find hand-picked pineapples that are perfectly ripe and ready to be enjoyed.",
            categories[0]
        ),
        itemCreate(
            "Peaches",
            "These fragrant and sweet fruits are a summertime favorite. Bite into their tender flesh to release a burst of flavor that will tantalize your taste buds. Perfect for snacking, baking, or adding a refreshing twist to salads, peaches bring a touch of sunshine to every dish. With their vibrant colors and enticing aroma, our carefully selected peaches are harvested at the peak of ripeness for maximum flavor.",
            categories[0]
        ),
        itemCreate(
            "Avocados",
            "Packed with healthy fats, vitamins, and fiber, avocados offer a delicious way to enhance your salads, sandwiches, and guacamole recipes. Our hand-selected avocados are perfectly ripened and ready to enjoy. From the rich and buttery Hass variety to the smooth and mild flavors of the Fuerte, explore our selection of avocados that will elevate your culinary creations.",
            categories[0]
        ),
        itemCreate(
            "Strawberries",
            "Bursting with vibrant color, these juicy berries are a delectable treat on their own or a delightful addition to desserts, salads, and smoothies. Savor the taste of summer with our hand-picked, ripe strawberries that deliver a delightful balance of sweetness and tanginess. Known for their antioxidant-rich properties, these heart-shaped fruits offer both deliciousness and health benefits. ",
            categories[0]
        ),
        itemCreate(
            "Oranges",
            "Packed with juicy goodness and a zesty flavor, these vitamin C-rich fruits are perfect for snacking, juicing, or adding a tangy twist to your recipes. Explore our selection of sweet navel oranges, tangy tangerines, and succulent blood oranges. Bursting with freshness and packed with health benefits, our oranges are nature's sunshine in every bite. ",
            categories[0]
        ),
    ]);
}