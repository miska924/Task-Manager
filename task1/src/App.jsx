import React from "react";
import classnames from "classnames/bind";
import styles from "./App.module.scss";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { connect } from 'react-redux'

const cx = classnames.bind(styles);

const defaultState = {
  tasks: [],
  task: {
    id: 1,
    name: 'Task Name',
    description: 'Task Description',
    priority: 123
  }
};

const cmp = (index) => {
  return (a, b) => {
    if (a[index] > b[index] | (a[index]===b[index] & a['id'] > b['id'])) {
      return 1;
    }
    return -1;
  }
}

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        tasks: [...state.tasks, {...state.task, priority: parseInt(state.task.priority)}],
        task: {
          id: state.task.id + 1,
          name: 'Task Name',
          description: 'Task Description',
          priority: 123
        }
      };
    }
    case 'SORT': {
      console.log('ahahah sort');
      let New = [];
      for (let i = 0; i < state.tasks.length; i++) {
        New.push(state.tasks[i]);
      }
      console.log(New);
      console.log("got:")
      if (action.payload == 'NAME') {
        New.sort(cmp('name'));
        console.log(New);
        return {
          ...state,
          tasks: New
        };
      } else {
        New.sort(cmp('priority'));
        console.log(New);
        return {
          ...state,
          tasks: New
        };
      }
    }
    case 'CHANGE':
      if (action.payload.field == 'priority') {
        return {
          ...state,
          task: {
            ...state.task,
            priority: action.payload.value
          }
        }
      } else if (action.payload.field == 'name') {
        return {
          ...state,
          task: {
            ...state.task,
            name: action.payload.value
          }
        }
      } else if (action.payload.field == 'description') {
        return {
          ...state,
          task: {
            ...state.task,
            description: action.payload.value
          }
        }
      }
    default: {
      return state;
    }
  }
}

const store = createStore(rootReducer);

const addTask = () => ({
  type: 'ADD',
});

const sort = (id) => ({
  type: 'SORT',
  payload: id
});

const change = (field, value) => ({
  type: 'CHANGE',
  payload: {field: field, value: value}
});

const mapStateToProps = (state) => {
  console.log(state);
  return ({tasks: state.tasks, task: state.task});
};

const mapDispatchToProps = dispatch => {
  return {
    dispatcherADD: (task) => {return dispatch(addTask(task))},
    dispatcherSORT: (id) => {return dispatch(sort(id))},
    dispatcherCHANGE: (field, value) => {return dispatch(change(field, value))}
  }
}

class MainComponent extends React.Component {

  handleChangeName = (event) => {
    const newName = event.target.value;
    this.props.dispatcherCHANGE('name', newName);
  };

  handleChangeDescription = (event) => {
    const newDescription = event.target.value;
    this.props.dispatcherCHANGE('description', newDescription);
  };

  handleChangePriority = (event) => {
    const newPriority = event.target.value;
    this.props.dispatcherCHANGE('priority', newPriority);
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
              <input value={this.props.task.name} onChange={this.handleChangeName}/>
            </div>
            <div className={cx("box")}>
              <h2>Discription</h2>
              <input value={this.props.task.description} onChange={this.handleChangeDescription}/>
            </div>
            <div className={cx("box")}>
              <h2>Priority</h2>
              <input type="text" value={this.props.task.priority} onChange={this.handleChangePriority}/>
            </div>
          </div>
          <div className={cx("buttons")}>
            <button className={cx("button")} onClick={() => this.props.dispatcherADD()}>Add New Task</button>
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
