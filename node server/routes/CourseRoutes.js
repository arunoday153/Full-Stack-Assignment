const router = require("express").Router();
const courseController = require("../controller/CourseController");

router.get("/course", courseController.getData);

module.exports = router;
