import React from "react";

import classnames from "classnames/bind";

import styles from "./App.module.scss";

const cx = classnames.bind(styles);


class App extends React.Component {
  state = {
    tasks: [],
    id: 1,
    name: 'Task name',
    description: 'Task description',
    priority: 123
  };

  handleChangeName = (event) => {
    const newName = event.target.value;
    this.setState(state => ({ name: newName }));
  };

  handleChangeDescription = (event) => {
    const newDescription = event.target.value;
    this.setState(state => ({ description: newDescription }));
  };

  handleChangePriority = (event) => {
    const newPriority = event.target.value;
    this.setState(state => ({ priority: parseInt(newPriority) }));
  };

  NewTask = () => {
    this.setState(state => ({ id: state.id + 1 }));
    const newTask = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      priority: this.state.priority
    }
    this.setState(state => (state.tasks.push(newTask)));
  };

  cmp = (index) => {
    return (a, b) => {
      if (a[index] > b[index]) {
        return 1;
      }
      return -1;
    }
  }

  SortName = () => {
    this.setState(state => this.state.tasks.sort(this.cmp('name')));
  }

  SortPriority = () => {
    this.setState(state => this.state.tasks.sort(this.cmp('priority')));
  }

  TaskShow = ({ task }) => (
    <div className={cx("taskLine")}>
      <div className={cx("taskId")}>
    #{task.id}
      </div>
      <div className={cx("taskName")}>
        {task.name}
      </div>
      <div className={cx("taskDescription")}>
        {task.description}
      </div>
      <div className={cx("taskPriority")}>
        {task.priority}
      </div>
    </div>
  );

  render() {
    return (
      <div className={cx("container")}>
        <div className={cx("header")}>
          <h1>Task Manager</h1>
        </div>
        <div className={cx("input")}>
          <div className={cx("boxes")}>
            <div className={cx("box")}>
              <h2>Name</h2>
              <input onChange={this.handleChangeName}/>
            </div>
            <div className={cx("box")}>
              <h2>Discription</h2>
              <input onChange={this.handleChangeDescription}/>
            </div>
            <div className={cx("box")}>
              <h2>Priority</h2>
              <input onChange={this.handleChangePriority}/>
            </div>
          </div>
          <div className={cx("buttons")}>
            <button className={cx("button")} onClick={this.NewTask}>Add New Task</button>
          </div>
        </div>
        <div className={cx("buttons")}>
            <button className={cx("button")} onClick={this.SortName}>Sort by Name</button>
            <button className={cx("button")} onClick={this.SortPriority}>Sort by Priority</button>
        </div>
        <div className={cx("content")}>
          {this.state.tasks.map(task => this.TaskShow({task}))}
        </div>
      </div>
    );
  }
}

export default App;
