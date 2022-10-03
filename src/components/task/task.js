import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';

import './task.css';

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: props.label,
      seconds: setInterval(this.onSetTimeDistance, 1000),
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSetValue = this.onSetValue.bind(this);
    this.onSetTimeDistance = this.onSetTimeDistance.bind(this);
  }

  onSetTimeDistance = () => {
    const propsValue = this.props;
    this.setState({ seconds: formatDistanceToNow(propsValue.timeCreate, { addSuffix: true, includeSeconds: true }) });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const stateValue = this.state;
    const propsValue = this.props;
    propsValue.onValueChange(stateValue.label, propsValue.id);
  };

  onSetValue = (e) => {
    this.setState({ label: e.target.value });
  };

  render() {
    const propsItem = this.props;
    const stateValue = this.state;
    const classNames = propsItem.done ? 'selected through' : 'selected';
    const classNameCheckbox = propsItem.done ? 'toggle checked' : 'toggle';
    // const secondsShow = stateValue.seconds > 60 ? 'minutes ago' : 'seconds ago';
    // const count = stateValue.seconds > 60 ? Math.floor(stateValue.seconds / 60) : stateValue.seconds;
    return (
      <>
        <div className="view">
          <input className={classNameCheckbox} type="checkbox" onChange={propsItem.onDone} />
          <label htmlFor={propsItem.label}>
            <span className={classNames}>{propsItem.label}</span>
            <span className="created"> created {stateValue.seconds} </span>
          </label>
          <button type="button" aria-label="edit" className="icon icon-edit" onClick={propsItem.onEdit} />
          <button type="button" aria-label="destroy" className="icon icon-destroy" onClick={propsItem.onDelete} />
        </div>
        <form className="header" onSubmit={this.onSubmit}>
          <input type="text" className="edit" defaultValue={stateValue.label} onChange={this.onSetValue} />
        </form>
      </>
    );
  }
}
