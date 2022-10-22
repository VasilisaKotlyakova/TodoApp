import React from 'react';

import Task from '../task';

/* eslint-disable react/jsx-props-no-spreading */

function TaskList({ todos, onDelete, onDone, onEdit, onValueChange }) {
  let isEmpty;
  if (todos) {
    isEmpty = todos.length === 0;
  }

  if (todos == null) {
    return <ul className=" selected"> Задач нет </ul>;
  }
  if (!!todos && !isEmpty) {
    const elements = todos.map((item) => {
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
  return <ul className=" selected"> Задач нет </ul>;
}

export default TaskList;
