import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onSetValue = this.onSetValue.bind(this);
  }

  onSetValue = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const stateValue = this.state;
    const propsValue = this.props;
    propsValue.onAdd(stateValue.label);
    this.setState({ label: '' });
  };

  render() {
    const stateValue = this.state;
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          type="text"
          value={stateValue.label}
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onSetValue}
        />
      </form>
    );
  }
}
