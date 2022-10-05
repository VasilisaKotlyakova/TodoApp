import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        label: '',
        timerMin: '',
        timerSec: '',
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onSetValue = this.onSetValue.bind(this);
  }

  onSetValue = (name, e) => {
    this.setState({ name: e.target.value });
  };

  onKeyPress = (e) => {
      const stateValue = this.state;
      const propsValue = this.props;
      if(e.key === 'Enter')
      {
          propsValue.onAdd(stateValue.label, stateValue.timerMin, stateValue.timerSec );
          this.setState({ label: '', timerMin: '', timerSec: ''});
      }
  };

  render() {
    const stateValue = this.state;
    return (
          <form className="header new-todo-form">
            <h1>todos</h1>
            <input
                type="text"
                value={stateValue.label}
                className="new-todo"
                placeholder="Task"
                onChange={(e) => this.setState({ label: e.target.value })}
                onKeyPress={this.onKeyPress}
            />
            <input className="new-todo-form__timer" onChange={(e) => this.setState({ timerMin: e.target.value })} value={stateValue.timerMin} placeholder="Min" onKeyPress={this.onKeyPress} />
            <input className="new-todo-form__timer" placeholder="Sec" onChange={(e) => this.setState({ timerSec: e.target.value })} value={stateValue.timerSec} onKeyPress={this.onKeyPress} />
          </form>
    );
  }
}
