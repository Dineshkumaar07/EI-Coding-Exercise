const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/add", taskController.addTask);
router.delete("/remove/:id", taskController.removeTask);
router.get("/view", taskController.viewTasks);
router.put("/edit/:id", taskController.editTask);
router.get("/view/priority/:priority", taskController.viewTasksByPriority);

module.exports = router;
