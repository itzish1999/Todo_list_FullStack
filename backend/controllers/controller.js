const db = require("../models")
const Todo = db.todo;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request via conditional statement
    if (!req.body.task) {
        res.status(400).send({
            message: "Server Can't or Will Not Process That Request... Try a Different Approach"
        });
        return;
    }

// Create a Task
const task = {
    task: req.body.task,
    description: req.body.description,
    due_date: req.body.due_date,
    completed: req.body.completed ? req.body.completed : false 
};

// Save a task in the database
Todo.create(todo)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "The Server Encountered an Unexpected Condition That Prevented it From Fulfilling The Request!"
        });
    });
};

// Retrieve all Tasks from the database
exports.findAll = (req, res) => {
    const task = req.query.task;
    var condition = task ? { task: { [Op.iLike]: `%${task}`} } : null;

    Todo.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "The Server Encountered an Unexpected Condition That Prevented it From Fulfilling The Request!"
        });
    });
};

// Find a task by its id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Todo.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Can't Find a Task with an id of ${id}...`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error Retrieving Task With an id of" + id
        });
    });
};

// Update a Task
exports.update = (req, res) => {
    const id = req.params.id;
    Todo.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if(num == 1) {
            res.send({
                message: "Task Was Updated Successfully!"
            });
        } else {
            res.send({
            message: `Can't Update Task With an id of ${id}!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error Updating Task with id-" + id
        });
    });
};

// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Todo.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: `Can't Delete Task With id = ${id}!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could Not Delete Task With id=" + id
        });
    });
};

// Delete all Tasks from the database
exports.deleteAll = (req, res) => {
    Todo.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} Tasks Were Deleted Successfully!`});
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some Error Occured While Removing All Tasks!"
        });
    });
};

// Find all completed Tasks by condition
exports.findAllCompleted = (req, res) => {
    Todo.findAll({ where: { completed: true } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
        err.message || "Some Error Occured While Retrieving Tasks!"
        });
    });
};