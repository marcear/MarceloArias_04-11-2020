//model
const Todo = require("../models/todo.model");

//this will return all the data, exposing only the id and action field to the client
exports.findAll = (req, res) => {
  Todo.find({})
    .then((data) => {
      if (!data) res.send({ notData: "not data" });
      else res.send({ res: 200, data: data });
    })
    .catch((err) => {
      let message = "Error retrieving todos";
      res.send(res, 500, message);
    });
};

exports.create = (req, res) => {
  const todoFromRequest = req.body;
  // Create a new todo
  const todo = new Todo({
    action: todoFromRequest.action,
  });
  // Save User in the database
  todo
    .save(todo)
    .then((data) => res.json({ data }))
    .catch((err) => {
      res.json({ error: err });
    });
};

exports.delete = (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then((data) => res.json({ msg: "deleted ok" }))
    .catch((err) => {
      let message = "Error deleting todo with id=" + req.params.id;
      res.json({ error: err });
    });
};

// Update a Todo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndUpdate(id, {
    action: req.body.action,
  })
    .then((data) => {
      if (!data) {
        let message =
          "Cannot update todo with id=" + id + ". todo was not found!";
        res.json({ error: message });
      } else {
        res.json({ msg: "todo was updated successfully" });
      }
    })
    .catch((err) => {
      let message = "Error updating todo with id=" + id;
      res.json({ error: message });
    });
};
