import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './app.css';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

export default function App() {
  const [todos, setTodos] = useState(() => JSON.parse(window.localStorage.getItem('todos')));

  const [filter, setFilter] = useState('all');

  const onDelete = (id) => {
    const idx = todos.findIndex((el) => el.id === id);
    const newTodos = [...todos.slice(0, idx), ...todos.slice(idx + 1)];
    window.localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(JSON.parse(window.localStorage.getItem('todos')));
  };

  const onAdd = (label) => {
    const idCount = uuidv4();
    const newItem = { id: idCount, label, done: false, edit: false, timeCreate: new Date() };
    const newState = todos === null ? [newItem] : [...todos, newItem];
    if (!label.trim()) {
      window.localStorage.setItem('todos', JSON.stringify([...todos]));
      return { todos: JSON.parse(window.localStorage.getItem('todos')) };
    }
    window.localStorage.setItem('todos', JSON.stringify(newState));
    setTodos(JSON.parse(window.localStorage.getItem('todos')));
    return true;
  };

  const onDone = (id) => {
    const idx = todos.findIndex((item) => item.id === id);
    const oldItem = todos[idx];
    const value = !oldItem.done;

    const item = { ...todos[idx], done: value };
    setTodos([...todos.slice(0, idx), item, ...todos.slice(idx + 1)]);
  };

  const onEdit = (id) => {
    const idx = todos.findIndex((item) => item.id === id);
    const oldItem = todos[idx];
    const value = !oldItem.edit;

    const item = { ...todos[idx], edit: value };
    window.localStorage.setItem('todos', JSON.stringify([...todos.slice(0, idx), item, ...todos.slice(idx + 1)]));
    setTodos(JSON.parse(window.localStorage.getItem('todos')));
  };

  const onFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const onValueChange = (label, id) => {
    const idx = todos.findIndex((item) => item.id === id);
    const item = { ...todos[idx], label, edit: false };
    window.localStorage.setItem('todos', JSON.stringify([...todos.slice(0, idx), item, ...todos.slice(idx + 1)]));
    setTodos(JSON.parse(window.localStorage.getItem('todos')));
  };

  const onFilter = (itemsValue, filterValue) => {
    if (filterValue === 'all') {
      return itemsValue;
    }
    if (filterValue === 'active') {
      return itemsValue.filter((item) => !item.done);
    }
    if (filterValue === 'completed') {
      return itemsValue.filter((item) => item.done);
    }
    return itemsValue;
  };

  const onClearCompleted = () => {
    const newItems = todos.filter((item) => !item.done);
    window.localStorage.setItem('todos', JSON.stringify(newItems));
    setTodos(JSON.parse(window.localStorage.getItem('todos')));
  };

  const doneCount = todos !== null ? todos.filter((item) => item.done).length : 0;
  const toDoCount = todos !== null ? todos.length - doneCount : 0;
  const visibleItems = onFilter(todos, filter);
  return (
    <>
      <NewTaskForm onAdd={onAdd} />
      <TaskList
        todos={visibleItems}
        onValueChange={onValueChange}
        onDelete={onDelete}
        onDone={onDone}
        onEdit={onEdit}
      />
      <Footer
        todos={todos}
        filter={filter}
        onFilterChange={onFilterChange}
        toDo={toDoCount}
        onClearCompleted={onClearCompleted}
      />
    </>
  );
}
