import React from 'react';

import './tasks-filter.css';

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
];

function TasksFilter({ filter, onFilterChange }) {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter;
    const classNames = isActive ? 'selected' : '';
    return (
      <button key={name} type="button" onClick={() => onFilterChange(name)} className={classNames}>
        {label}
      </button>
    );
  });
  return (
    <ul className="filters">
      <li>{buttons}</li>
    </ul>
  );
}

export default TasksFilter;
