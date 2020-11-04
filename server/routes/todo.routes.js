module.exports = (app) => {
  const todo = require("../controllers/todo.controller.js");
  var router = require("express").Router();

  // Retrieve all todos
  router.get("/", todo.findAll);

  // Create a new todo
  router.post("/create", todo.create);

  // Delete todo
  router.delete("/:id", todo.delete);

  //Update todo with id
  router.put("/update/:id", todo.update);

  app.use("/api/todos", router);
};
