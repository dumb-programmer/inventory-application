const deleteItemBtn = document.querySelector(".delete-item-btn");
const updateItemBtn = document.querySelector(".update-item-btn");

deleteItemBtn.addEventListener("click", () => {
    window.location.href = `/item/delete/10`
});

updateItemBtn.addEventListener("click", () => {
    window.location.href = `/item/update/10`;
})