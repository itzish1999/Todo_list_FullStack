// Connect database to app
module.exports = {
    SERVER: 'localhost',
    USER: 'postgres',
    DB: 'employees',
    PASSWORD: 'Alpha123Beta456Charlie789',
    dialect: 'postgres',
    Pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

/* First 5 params are mandatory to connect the database to the app.
You have to and MUST put in the right information pertaining to the user, password, and database.
If I am working on a already deployed db I would just adjust the remaining code */

// Everything in pool is optional and are ment for the responses and limits I set for the app.