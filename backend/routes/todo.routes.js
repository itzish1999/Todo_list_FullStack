module.exports = app => {
    const todo = require("../controllers/controller.js");

    // use var because routes can change instead of const
    var router = require("express").Router();

    // Create a new Task
    router.post("/", todo.create);

    // Retrieve all Tasks
    router.get("/", todo.findAll);

    // Retrieve all completed tasks
    router.get("/:id", todo.findAllCompleted);

    // Retrieve one completed Task
    router.get("/:id", todo.findOne);

    // Update a single Task with id
    router.get("/:id", todo.update);

    // Delete a Task with id
    router.delete("/:id", todo.delete);

    // Delete all Tasks
    router.delete("/", todo.deleteAll);

    // HTTP path being used
    app.use("/list/todo", router);
};