const express = require("express")
const router = express() ;
const {getAllTasks , updateTask , getTask , deleteTask , createTask} = require("../controllers/functions")

router.route("/").get(getAllTasks)
router.route("/").post(createTask)
router.route("/:id").get(getTask)
router.route("/:id").patch(updateTask)
router.route("/:id").delete(deleteTask)



module.exports = router
