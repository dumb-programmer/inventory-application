const express = require("express");
const router = express.Router();
const item_controller = require("../controllers/item");

router.get("/", item_controller.index);
router.get("/create", item_controller.create_item_form);
router.post("/create", item_controller.create_item);
router.get("/:itemId", item_controller.get_item);
router.get("/update/:itemId", item_controller.update_item_form);
router.post("/update/:itemId", item_controller.update_item);
router.get("/delete/:itemId", item_controller.delete_item_confirmation);
router.post("/delete/:itemId", item_controller.delete_item);

module.exports = router;