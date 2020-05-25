import React from "react";
import classnames from "classnames/bind";
import styles from "./App.module.scss";
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';

const cx = classnames.bind(styles);

const defaultState = {
  current_project_id: 0,
  projects: [],
  tasks: [],
  task: {
    id: 0,
    name: '',
    description: '',
    priority: '',
  },
  project: {
    id: 0,
    name: ''
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
    case 'ADD_TASK': {
      let New = state.tasks;
      New[state.current_project_id].push(state.task);
      return {
        ...state,
        tasks: New,
        task: {
          id: state.task.id + 1,
          name: '',
          description: '',
          priority: '',
        }
      };
    }
    case 'ADD_PROJECT':
      let New = [...state.tasks];
      New.push([]);
      return {
        ...state,
        projects: [...state.projects, {...state.project}],
        tasks: New,
        project: {
          id: state.project.id + 1,
          name: ''
        }
      };
    case 'SORT': {
      console.log('ahahah sort');
      let New = [];
      for (let x = 0; x < state.tasks.length; x++) {
        if (x == state.current_project_id)  {
          New.push([]);
          for (let y = 0; y < state.tasks[x].length; y++) {
            New[x].push(state.tasks[state.current_project_id][y]);
          }
          New[x].sort(cmp(action.payload.toLowerCase()));
        } else {
          New.push(state.tasks[x]);
        }
      }
      return {
        ...state,
        tasks: New
      };
    }
    case 'CHANGE_TASK':
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
    case 'CHANGE_PROJECT':
      return {
        ...state,
        project: {
          ...state.project,
          name: action.payload.value
        }
      }
    case 'SWITCH_PROJECT':
      return {
        ...state,
        current_project_id: action.payload.value
      }
    default: {
      return state;
    }
  }
}

const store = createStore(rootReducer);

const addProject = () => ({
  type: 'ADD_PROJECT'
});

const addTask = () => ({
  type: 'ADD_TASK'
});

const sort = (id) => ({
  type: 'SORT',
  payload: id
});

const changeTask = (field, value) => ({
  type: 'CHANGE_TASK',
  payload: {field: field, value: value}
});

const switchProject = (value) => ({
  type: 'SWITCH_PROJECT',
  payload: {value: value}
});

const changeProject = (value) => ({
  type: 'CHANGE_PROJECT',
  payload: {value: value}
});

const mapStateToProps = (state) => {
  console.log(state);
  return (state);
};

const mapDispatchToProps0 = dispatch => {
  return {
    dispatcherADD_PROJECT: () => {return dispatch(addProject())},
    dispatcherCHANGE_PROJECT: (value) => {return dispatch(changeProject(value))},
    dispatcherSWITCH: (value) => {return dispatch(switchProject(value))}
  }
}

const mapDispatchToProps1 = dispatch => {
  return {
    dispatcherADD_TASK: () => {return dispatch(addTask())},
    dispatcherSORT: (id) => {return dispatch(sort(id))},
    dispatcherCHANGE_TASK: (field, value) => {return dispatch(changeTask(field, value))},
  }
}

class AddProjectComponent extends React.Component {

  handleChangeName = (event) => {
    const newName = event.target.value;
    this.props.dispatcherCHANGE_PROJECT(newName);
  };

  ProjectShow = ({ project }) => (
    <div className={cx("taskLine")}>
      <div className={cx("taskId")}>
        #{project.id}
      </div>
      <div className={cx("taskName")}>
        <Link to="/project" onClick={() => this.props.dispatcherSWITCH(project.id)}>{project.name}</Link>
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
              <input value={this.props.project.name} placeholder="Project Name" onChange={this.handleChangeName}/>
            </div>
          </div>
          <div className={cx("buttons")}>
            <button className={cx("button")} onClick={() => this.props.dispatcherADD_PROJECT()}>Add New Project</button>
          </div>
        </div>
        <div className={cx("content")}>
          {
            this.props.projects.map(project => this.ProjectShow({project}))
          }
        </div>
      </div>
    );
  }
}

class ProjectComponent extends React.Component {

  handleChangeName = (event) => {
    const newName = event.target.value;
    this.props.dispatcherCHANGE_TASK('name', newName);
  };

  handleChangeDescription = (event) => {
    const newDescription = event.target.value;
    this.props.dispatcherCHANGE_TASK('description', newDescription);
  };

  handleChangePriority = (event) => {
    const newPriority = event.target.value;
    this.props.dispatcherCHANGE_TASK('priority', newPriority);
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
        <div className={cx("return")}>
          <Link to="/"><img src={require('./return.png')}  height="60" width="60"/></Link>
        </div>
        <div className={cx("header")}>
          <h1>{(this.props.projects[this.props.current_project_id].name).toUpperCase()}</h1>
        </div>
        <div className={cx("input")}>
          <div className={cx("boxes")}>
            <div className={cx("box")}>
              <h2>Name</h2>
              <input value={this.props.task.name} placeholder="Task Name" onChange={this.handleChangeName}/>
            </div>
            <div className={cx("box")}>
              <h2>Description</h2>
              <input value={this.props.task.description} placeholder="Task Description" onChange={this.handleChangeDescription}/>
            </div>
            <div className={cx("box")}>
              <h2>Priority</h2>
              <input type="text" value={this.props.task.priority} placeholder="Task Priority" onChange={this.handleChangePriority}/>
            </div>
          </div>
          <div className={cx("buttons")}>
            <button className={cx("button")} onClick={() => this.props.dispatcherADD_TASK()}>Add New Task</button>
          </div>
        </div>
        <div className={cx("buttons")}>
            <button className={cx("button")} onClick={() => {this.props.dispatcherSORT('NAME')}}>Sort by Name</button>
            <button className={cx("button")} onClick={() => {this.props.dispatcherSORT('PRIORITY')}}>Sort by Priority</button>
        </div>
        <div className={cx("content")}>
          {
              this.props.tasks[this.props.current_project_id].map(task => this.TaskShow({task}))
          }
        </div>
      </div>
    );
  }
}

const WrappedAddProjectComponent = connect(mapStateToProps, mapDispatchToProps0)(AddProjectComponent);
const WrappedProjectComponent = connect(mapStateToProps, mapDispatchToProps1)(ProjectComponent);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={WrappedAddProjectComponent} />
            <Route path='/project' exact component={WrappedProjectComponent} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
};

export default App;
