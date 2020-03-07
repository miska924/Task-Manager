import React from "react";

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
    this.setState(state => ({ priority: newPriority }));
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
    <div>
    {task.id}) {task.name} ({task.description}) - {task.priority}
    </div>
  );

  render() {
    return (
      <div>
        <h1>Task Manager</h1>
        <div>
          {this.state.tasks.map(task => this.TaskShow({task}))}
        </div>
        <button onClick={this.SortName}>Sort by Name</button>
        <button onClick={this.SortPriority}>Sort by Priority</button>
        <h2>Name: <input onChange={this.handleChangeName}/></h2>
        <h2>Discription: <input onChange={this.handleChangeDescription}/></h2>
        <h2>Priority: <input onChange={this.handleChangePriority}/></h2>
        <br/>
        <button onClick={this.NewTask}>Add New Task</button>
      </div>
    );
  }
}

export default App;
