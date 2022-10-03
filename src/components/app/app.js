import React, { Component } from 'react';

import './app.css';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, label: 'Drink Coffee', done: false, edit: false, timeCreate: new Date() },
        { id: 2, label: 'Learn React', done: false, edit: false, timeCreate: new Date() },
        { id: 3, label: 'Make Awesome App', done: false, edit: false, timeCreate: new Date() },
      ],
      filter: 'all',
    };
    this.maxId = 100;
    this.onDone.bind(this);
    this.onEdit.bind(this);
  }

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((el) => el.id === id);
      const items = [...state.items.slice(0, idx), ...state.items.slice(idx + 1)];
      return { items };
    });
  };

  onAdd = (label) => {
    const idCount = this.maxId + 1;
    const newItem = { id: idCount, label, done: false, edit: false, timeCreate: new Date() };
    this.setState((state) => {
      const newState = [...state.items, newItem];
      return { items: newState };
    });
  };

  onDone = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const oldItem = state.items[idx];
      const value = !oldItem.done;

      const item = { ...state.items[idx], done: value };
      return { items: [...state.items.slice(0, idx), item, ...state.items.slice(idx + 1)] };
    });
  };

  onEdit = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const oldItem = state.items[idx];
      const value = !oldItem.edit;

      const item = { ...state.items[idx], edit: value };
      return { items: [...state.items.slice(0, idx), item, ...state.items.slice(idx + 1)] };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onValueChange = (label, id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id);
      const item = { ...state.items[idx], label, edit: false };
      return { items: [...state.items.slice(0, idx), item, ...state.items.slice(idx + 1)] };
    });
  };

  onFilter(items, filter) {
    if (filter === 'all') {
      return items;
    }
    if (filter === 'active') {
      return items.filter((item) => !item.done);
    }
    if (filter === 'completed') {
      return items.filter((item) => item.done);
    }
    return this.items;
  }

  onClearCompleted = () => {
    this.setState((state) => {
      const newItems = state.items.filter((item) => !item.done);
      return { items: newItems };
    });
  };

  render() {
    const { items, filter } = this.state;
    const doneCount = items.filter((item) => item.done).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = this.onFilter(items, filter);
    return (
      <>
        <NewTaskForm onAdd={this.onAdd} />
        <TaskList
          items={visibleItems}
          onValueChange={this.onValueChange}
          onDelete={this.onDelete}
          onDone={this.onDone}
          onEdit={this.onEdit}
        />
        <Footer
          items={items}
          filter={filter}
          onFilterChange={this.onFilterChange}
          toDo={toDoCount}
          onClearCompleted={this.onClearCompleted}
        />
      </>
    );
  }
}
