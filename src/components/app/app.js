import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './app.css';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: 'all',
    };
    this.onDone.bind(this);
    this.onEdit.bind(this);
  }

  componentDidMount() {
    this.setState({ todos: JSON.parse(window.localStorage.getItem('todos')) });
  }

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.todos.findIndex((el) => el.id === id);
      const todos = [...state.todos.slice(0, idx), ...state.todos.slice(idx + 1)];
      window.localStorage.setItem('todos', JSON.stringify(todos));
      return { todos: JSON.parse(window.localStorage.getItem('todos')) };
    });
  };

  onAdd = (label) => {
    const idCount = uuidv4();
    const newItem = { id: idCount, label: label.trim(), done: false, edit: false, timeCreate: new Date() };
    this.setState((state) => {
      const newState = state.todos === null ? [newItem] : [...state.todos, newItem];
      if (!label.trim()) {
        window.localStorage.setItem('todos', JSON.stringify([...state.todos]));
        return { todos: JSON.parse(window.localStorage.getItem('todos')) };
      }
      window.localStorage.setItem('todos', JSON.stringify(newState));
      return { todos: JSON.parse(window.localStorage.getItem('todos')) };
    });
  };

  onDone = (id) => {
    this.setState((state) => {
      const idx = state.todos.findIndex((item) => item.id === id);
      const oldItem = state.todos[idx];
      const value = !oldItem.done;

      const item = { ...state.todos[idx], done: value };
      return { todos: [...state.todos.slice(0, idx), item, ...state.todos.slice(idx + 1)] };
    });
  };

  onEdit = (id) => {
    this.setState((state) => {
      const idx = state.todos.findIndex((item) => item.id === id);
      const oldItem = state.todos[idx];
      const value = !oldItem.edit;

      const item = { ...state.todos[idx], edit: value };
      window.localStorage.setItem(
        'todos',
        JSON.stringify([...state.todos.slice(0, idx), item, ...state.todos.slice(idx + 1)])
      );
      return { todos: JSON.parse(window.localStorage.getItem('todos')) };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onValueChange = (label, id) => {
    this.setState((state) => {
      const idx = state.todos.findIndex((item) => item.id === id);
      const item = { ...state.todos[idx], label, edit: false };
      window.localStorage.setItem(
        'todos',
        JSON.stringify([...state.todos.slice(0, idx), item, ...state.todos.slice(idx + 1)])
      );
      return { todos: JSON.parse(window.localStorage.getItem('todos')) };
    });
  };

  onFilter(todos, filter) {
    if (filter === 'all') {
      return todos;
    }
    if (filter === 'active') {
      return todos.filter((item) => !item.done);
    }
    if (filter === 'completed') {
      return todos.filter((item) => item.done);
    }
    return this.todos;
  }

  onClearCompleted = () => {
    this.setState((state) => {
      const newItems = state.todos.filter((item) => !item.done);
      window.localStorage.setItem('todos', JSON.stringify(newItems));
      return { todos: JSON.parse(window.localStorage.getItem('todos')) };
    });
  };

  render() {
    const { todos, filter } = this.state;
    const doneCount = todos ? todos.filter((item) => item.done).length : 0;
    const toDoCount = todos ? todos.length - doneCount : 0;
    const visibleItems = this.onFilter(todos, filter);
    return (
      <>
        <NewTaskForm onAdd={this.onAdd} />
        <TaskList
          todos={visibleItems}
          onValueChange={this.onValueChange}
          onDelete={this.onDelete}
          onDone={this.onDone}
          onEdit={this.onEdit}
        />
        <Footer
          todos={todos}
          filter={filter}
          onFilterChange={this.onFilterChange}
          toDo={toDoCount}
          onClearCompleted={this.onClearCompleted}
        />
      </>
    );
  }
}
