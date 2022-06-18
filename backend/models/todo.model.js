// Creating a model that we will use for our data by having our app create a table with needed information
module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define('todo_list', {
        task: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        due_date: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN
        }
    });
};

// Instead of creating one through the db cli, this makes it for us

// Tidbit is that we don't need to write functions at all