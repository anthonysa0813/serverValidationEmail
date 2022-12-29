const { Router } = require("express");
const { getAllValidations, saveInformation } = require("../controllers");

const router = Router();

router.get("/", getAllValidations);
router.post("/", saveInformation);

module.exports = router;
