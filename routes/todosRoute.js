const express = require("express");
const { ensureAuthentication } = require("../middleware/auth");

const router = express.Router();
const {
  addTodo,
  readTodos,
  editTodo,
  deleteTodo,
} = require("../controllers/todosController");

// create a todo
router.post("/add", ensureAuthentication, addTodo);

// read all todos
router.get("/", ensureAuthentication, readTodos);

// edit todo
router.patch("/:id", ensureAuthentication, editTodo);

// delete todo
router.delete("/:id", ensureAuthentication, deleteTodo);

module.exports = router;
