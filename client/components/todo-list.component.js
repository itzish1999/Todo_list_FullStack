import React, { Component } from 'react';
import TodoListDataService from '../services/todo.service';
import { Link } from 'react-router-dom';

export default class TodoList extends Component {
    constructor(props){
    super(props);
    this.onChangeSearchTask = this.onChangeSearchTask.bind(this);
    this.retrieveTasks = this.retrieve.Tasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTask = this.searchTask.bind(this);
    this.state = {
        tasks: [],
        currentTask: null,
        currentIndex: -1,
        searchTask: ""
    };
  }
  componentDidMount() {
    this.retrieveTasks();
  }
  onChangeSearchTask(e) {
    const searchTask = e.target.value;
    this.setState ({
        searchTask : searchTask
    });
  }
  retrieveTasks() {
    TodoListDataService.getAll()
    .then(response => {
        this.setState({
            tasks: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
  }
  refreshList() {
    this.retrieveTasks();
    this.setState ({
        currentTask: null,
        currentIndex: -1
    });
  }
  setActiveTask(task, index) {
    this.setState ({
        currentTask: task,
        currentIndex: index
    });
  }
  removeAllTasks() {
    TodoListDataService.deleteAll()
    .then(response => {
        console.log(response.data);
        this.refreshList();
    })
    .catch(e => {
        console.log(e);
    });
  }
  searchTask() {
    TodoListDataService.findByTask(this.state.searchTask)
    .then(response => {
        this.setState ({
            tasks: response.data
        });
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
  }
  render() {
    const { searchTask, tasks, currentTask, currentIndex} = this.state;
    
    return (
        <div className = "list row">
            <div className = "col-md-8">
                <div className = "input-group mb-3">
                <input
                type = "text"
                className = "form-control"
                placeholder = "Search by Task"
                value = {searchTask}
                onChange = {this.onChangeSearchTask}
                />
                <div className = "input-group-append">
                    <button
                    className = "btn btn-outline-secondary"
                    type = "button"
                    onClick = {this.searchTask}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div className = "col-md-6">
            <h4>Todo List</h4>
            <ul className = "list-group">
                {tasks &&
                tasks.map((task, index) => (
                    <li
                        className = {
                            "list-group-item " +
                            (index === currentIndex ? "active" : "")
                        }
                        onClick = {() => this.setActiveTask(task, index)}
                        key = {index}
                    >
                        {task.task}
                    </li>
                ))}
            </ul>
            <button
            className = "m-3 btn btn-sm btn-danger"
            onClick = {this.removeAllTasks}
            >
                Remove All
            </button>
        </div>
        <div className = "col-md-6">
            {currentTask ? (
                <div>
                    <h4>Task</h4>
                    <div>
                        <label>
                            <strong>Task:</strong>
                        </label>{" "}
                        {currentTask.task}
                    </div>
                    <div>
                        <label>
                            <strong>Description:</strong>
                        </label>{" "}
                        {currentTask.description}
                    </div>
                    <div>
                        <label>
                            <strong>Status:</strong>
                        </label> {" "}
                        {currentTask.completed ? "Compleded" : "Pending"}
                    </div>
                    <Link
                    to = {"/TodoList/" + currentTask.id}
                    className = "badge badge-warning"
                    >
                        Edit
                    </Link>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please Click On A Task...</p>
                </div>
            )}
        </div>
    </div>
    );
  }
}