const createItemBtn = document.querySelector(".create-item-btn");
const createCategoryBtn = document.querySelector(".create-category-btn");

createItemBtn.addEventListener("click", () => {
    window.location = "/item/create";
});

createCategoryBtn.addEventListener("click", () => {
    window.location = "/category/create";
})