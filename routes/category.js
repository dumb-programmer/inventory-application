const express = require("express");
const router = express.Router();

const category_controller = require("../controllers/category");

router.get("/create", category_controller.create_category_form);
router.post("/create", category_controller.create_category);

router.get("/update/:categoryId", category_controller.update_category_form);
router.post("/update/:categoryId", category_controller.update_category);

router.get("/delete/:categoryId", category_controller.delete_category_confirmation);
router.post("/delete/:categoryId", category_controller.delete_category);

module.exports = router;