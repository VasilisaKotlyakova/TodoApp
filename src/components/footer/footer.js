import React from 'react';

import TasksFilter from '../tasks-filter';
import './footer.css';

function Footer({ filter, toDo, onFilterChange, onClearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={() => onClearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
