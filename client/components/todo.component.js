import React, { Component } from 'react';
import TodoListDataService from '../services/todo.service';

export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.newTodo = this.newTodo.bind(this);
        this.state = {
            id: null,
            task: "",
            description: "",
            completed: false,
            submitted: false
        };
    }
    onChangeTask(e) {
        this.setState({
            task: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    saveTodo() {
        var data = {
            task: this.state.task,
            description: this.state.description
        };
        TodoListDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                task: response.data.task,
                description: response.data.title,
                completed: response.data.completed,
                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    newTodo() {
        this.setState({
            id: null,
            task: "",
            description: "",
            completed: false,
            submitted: false
        });
    }
    render() {
        return (
            <div className = "submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You Submitted Successfully!</h4>
                        <button className = "btn btn-success" onClick = {this.newTodo}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className = "from-group">
                            <label htmlFor = "task">Task</label>
                            <input
                            type = "text"
                            className = "form-control"
                            id = "title"
                            required
                            value = {this.state.task}
                            onChange = {this.onChangeTask}
                            name = "task"
                            />
                        </div>
                        <div>
                            <label htmlFor = "description">Description</label>
                            <input
                            type = "text"
                            className = "form-control"
                            id = "description"
                            required
                            value = {this.state.description}
                            onChange = {this.onChangeDescription}
                            name = "description"
                            />
                        </div>
                        <button onClick = {this.saveTodo} className = "btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}