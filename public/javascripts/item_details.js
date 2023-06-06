const deleteItemBtn = document.querySelector(".delete-item-btn");
const updateItemBtn = document.querySelector(".update-item-btn");

deleteItemBtn.addEventListener("click", () => {
    const id = window.location.href.split("/");
    window.location.href = `/item/delete/${id[id.length - 1]}`;
});

updateItemBtn.addEventListener("click", () => {
    const id = window.location.href.split("/");
    window.location.href = `/item/update/${id[id.length - 1]}`;
})