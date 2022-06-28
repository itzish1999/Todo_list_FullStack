import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
        <nav className = "navbar navbar-expand navbar-dark bg-dark">
          <a href = "/TodoList" className = "navbar-brand">
            TodoList!
          </a>
          <div className = "navbar-nav mr-auto">
            <li className = "nav-item">
              <Link to = {"/TodoList"} className = "nav-link">
                TodoList
              </Link>
            </li>
            <li className = "nav-item">
              <Link to = {"/add"} className = "nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className = "container mt-3">
          <Switch>
            <Route exact path = {["/", "/TodoList"]} component = {TodoList} />
            <Route exact path = "/add" component = {AddTodo} />
            <Route path = "/TodoList/:id" component = {Todo} />
          </Switch>
        </div>
    </div>
  );
}

export default App;
