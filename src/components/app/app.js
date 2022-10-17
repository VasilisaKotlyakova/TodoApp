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
        { id: 1, label: 'Drink Coffee', done: false, edit: false, timeCreate: new Date(), timerMin: 1, timerSec: 20, timer: null},
        { id: 2, label: 'Learn React', done: false, edit: false, timeCreate: new Date(), timerMin: 1, timerSec: 30, timer: null},
        { id: 3, label: 'Make Awesome App', done: false, edit: false, timeCreate: new Date(), timerMin: 1, timerSec: 30, timer: null},
      ],
      filter: 'all',
    };

    this.maxId = 100;
    this.onDone.bind(this);
    this.onEdit.bind(this);
    this.onPlay.bind(this);
    this.countDown.bind(this);

  }

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((el) => el.id === id);
      const items = [...state.items.slice(0, idx), ...state.items.slice(idx + 1)];
      return { items };
    });
  };

  onAdd = (label, timerMin, timerSec) => {
    const idCount = this.maxId + 1;
    const newItem = { id: idCount, label, done: false, edit: false, timeCreate: new Date(), timerMin: Number(timerMin), timerSec: Number(timerSec), timer: null, duration: 0};
    this.setState((state) => {
      const newState = [...state.items, newItem];
      if (!label.trim()) {
        return { state };
      }
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

  onPlay = (id) => {
    const idx = this.state.items.findIndex((item) => item.id === id);
    const item = this.state.items[idx];
    window.localStorage.setItem(id, JSON.stringify(item.timerMin*60 + item.timerSec));
    if (item.timer === null && JSON.parse(window.localStorage.getItem(id)) > 0) {
      item.timer = setInterval(() => this.countDown(idx, id), 1000);
    }
  }

  countDown(idx, id) {
    let seconds = JSON.parse(window.localStorage.getItem(id)) - 1;// this.state.items[idx].timerMin*60 + this.state.items[idx].timerSec - 1;
    let newItem = {...this.state.items[idx], timerMin: Math.floor(seconds/60), timerSec: seconds%60};
    if (seconds < 0) {
      clearInterval(this.state.items[idx].timer);
      newItem = {...this.state.items[idx], timer: null};
    }
    window.localStorage.setItem(id, JSON.stringify(seconds));
    this.setState({ items: [...this.state.items.slice(0, idx), newItem, ...this.state.items.slice(idx + 1)] });
  }

  onPause = (id) => {
    const idx = this.state.items.findIndex((item) => item.id === id);
    const item = this.state.items[idx];
    const newItem = {...this.state.items[idx], timer: null };
    this.setState(() => {
      clearInterval(item.timer);
      return { items: [...this.state.items.slice(0, idx), newItem, ...this.state.items.slice(idx + 1)] };
    });
  }

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
          onPlay={this.onPlay}
          onPause={this.onPause}
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
