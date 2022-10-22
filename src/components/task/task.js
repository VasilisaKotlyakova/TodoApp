import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default function TaskItem({ label, timeCreate, id, onValueChange, done, onDone, onEdit, onDelete }) {
  const [labelCount, setLabelCount] = useState(label);
  const [seconds, setSeconds] = useState();
  const setTime = () => {
    const sec = formatDistanceToNow(new Date(timeCreate), { addSuffix: true, includeSeconds: true });
    setSeconds(sec);
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(), 1000);
    return () => clearInterval(timer);
  });

  const onSubmit = (e) => {
    e.preventDefault();
    onValueChange(labelCount, id);
  };

  const onSetValue = (e) => setLabelCount(e.target.value);
  const classNames = done ? 'selected through' : 'selected';
  const classNameCheckbox = done ? 'toggle checked' : 'toggle';
  return (
    <>
      <div className="view">
        <input className={classNameCheckbox} type="checkbox" onChange={onDone} />
        <label htmlFor={label}>
          <span className={classNames}>{label}</span>
          <span className="created"> created {seconds} </span>
        </label>
        <button type="button" aria-label="edit" className="icon icon-edit" onClick={onEdit} />
        <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={onDelete} />
      </div>
      <form className="header" onSubmit={onSubmit}>
        <input type="text" className="edit" defaultValue={labelCount} onChange={onSetValue} />
      </form>
    </>
  );
}
