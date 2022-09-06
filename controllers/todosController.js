const Todo = require("../models/todosModel");
const { success, error } = require("../utils/wrapper");

// @desc    add new todo
// @route   POST /todos/add
const addTodo = async (req, res, next) => {
  if (!req.body.todo) {
    return error(res, "Missing Credentials");
  }
  try {
    const newTodo = await Todo.create({
      userId: req.user.id,
      todo: req.body.todo,
    });
    return success(res, newTodo, "Todo has been created");
  } catch (err) {
    return next(err);
  }
};

// @desc    read todo
// @route   get /todos
const readTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    if (todos.length === 0) {
      return success(res, todos, "No todos");
    }
    return success(res, todos, "Get all todos");
  } catch (err) {
    return next(err);
  }
};

// @desc    edit a todo
// @route   PUT /todos/:id

const editTodo = async (req, res, next) => {
  if (!req.params.id || !req.body.todo) {
    return error(res, "Missing Credentials");
  }
  try {
    const foundTodo = await Todo.findById(req.params.id);
    if (!foundTodo) {
      return error(res, "Todo Not Found");
    }
    if (!foundTodo.userId.equals(req.user.id)) {
      return error(res, "Not Authorized", 401);
    }
    const updTodo = await Todo.findByIdAndUpdate(
      foundTodo.id,
      {
        todo: req.body.todo,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return success(res, updTodo, "Todo has been updated");
  } catch (err) {
    return next(err);
  }
};

// @desc    delete todo
// @route   DELETE /todos/:id
const deleteTodo = async (req, res, next) => {
  if (!req.params.id) {
    return error(res, "Missing Credentials");
  }
  try {
    const foundTodo = await Todo.findById(req.params.id);
    if (!foundTodo) {
      return error(res, "Todo Not Found");
    }
    if (!foundTodo.userId.equals(req.user.id)) {
      return error(res, "Not Authorized", 401);
    }
    const delTodo = await Todo.findByIdAndRemove(req.params.id);
    return success(res, delTodo, "Todo has been deleted");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addTodo,
  readTodos,
  editTodo,
  deleteTodo,
};
