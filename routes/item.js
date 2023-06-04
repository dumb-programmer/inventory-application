const express = require("express");
const router = express.Router();
const item_controller = require("../controllers/item");

router.get("/", item_controller.index);
router.post("/create", item_controller.create_item);
router.get("/:itemId", item_controller.get_item);
router.put("/:itemId", item_controller.update_item);
router.delete("/:itemId", item_controller.delete_item);

module.exports = router;