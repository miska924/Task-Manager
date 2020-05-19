import React from "react";
import classnames from "classnames/bind";
import styles from "./App.module.scss";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { connect } from 'react-redux'

const cx = classnames.bind(styles);

const defaultState = {
  tasks: []
};

const cmp = (index) => {
  return (a, b) => {
    if (a[index] > b[index] | (a[index]===b[index] & a['id'] === b['id'])) {
      return 1;
    }
    return -1;
  }
}

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD': {
      let New = state;
      New.tasks.push(action.payload);
      return New;
    }
    case 'SORT': {
      console.log('ahahah sort');
      let New = state;
      console.log(New);
      console.log("got:")
      if (state.payload == 'NAME') {
        New.tasks.sort(cmp('name'));
        console.log(New);
        return New;
      } else {
        New.tasks.sort(cmp('priority'));
        console.log(New);
        return New;
      }
    }
    default: {
      return state;
    }
  }
}

const store = createStore(rootReducer);

const addTask = (task) => ({
  type: 'ADD',
  payload: task
});

const sort = (id) => ({
  type: 'SORT',
  payload: id
});

const mapStateToProps = (state) => {
  console.log(state);
  return ({tasks: state.tasks});
};

const mapDispatchToProps = dispatch => {
  return {
    dispatcherADD: (task) => {return dispatch(addTask(task))},
    dispatcherSORT: (id) => {return dispatch(sort(id))}
  }
}

class MainComponent extends React.Component {
  state = {
    kek: 0,
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
    return newTask;
  };

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
    console.log(this.state);
    console.log(this.props);
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
            <button className={cx("button")} onClick={() => this.props.dispatcherADD(this.NewTask())}>Add New Task</button>
          </div>
        </div>
        <div className={cx("buttons")}>
            <button className={cx("button")} onClick={() => {this.props.dispatcherSORT('NAME')}}>Sort by Name</button>
            <button className={cx("button")} onClick={() => {this.props.dispatcherSORT('PRIORITY')}}>Sort by Priority</button>
        </div>
        <div className={cx("content")}>
          {
              this.props.tasks.map(task => this.TaskShow({task}))
          }
        </div>
      </div>
    );
  }
}

const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(MainComponent);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <WrappedComponent />
      </Provider>
    );
  }
};


export default App;
