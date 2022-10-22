import React, { useCallback, useState } from 'react';

import './new-task-form.css';

export default function NewTaskForm({ onAdd }) {
  const [label, setLabel] = useState('');

  const onSetValue = (e) => setLabel(e.target.value);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onAdd(label);
      setLabel('');
    },
    [label]
  );
  return (
    <form className="header" onSubmit={onSubmit}>
      <h1>todos</h1>
      <input
        type="text"
        value={label}
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onSetValue}
      />
    </form>
  );
}
