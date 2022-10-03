import React from 'react';

import Task from '../task';

/* eslint-disable react/jsx-props-no-spreading */

function TaskList({ items, onDelete, onDone, onEdit, onValueChange }) {
  const elements = items.map((item) => {
    const { id, edit, ...itemProps } = item;
    const classNameEdit = edit ? 'editing' : 'completed';
    return (
      <li key={id} className={classNameEdit}>
        <Task
          {...itemProps}
          id={id}
          onDelete={() => onDelete(id)}
          onDone={() => onDone(id)}
          onEdit={() => onEdit(id)}
          onValueChange={onValueChange}
        />
      </li>
    );
  });
  return <ul className="todo-list"> {elements} </ul>;
}

export default TaskList;
