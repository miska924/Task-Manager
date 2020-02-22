import React from "react";

import "./App.css";

const FunctionalComponent = ({ name, onClick }) => {
  const greeting = "Hello, " + name;
  return (
    <button className="content" onClick={onClick}>
      {greeting}
    </button>
  );
};

const Clock = ({ date }) => <div>{date.toLocaleTimeString()}</div>;


class ClassComponent extends React.Component {
  state = {
    message: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(this.state.date = new Date())
    }, 100);
  }

  handleGreetingClick = () => {
    this.setState(state => {
      console.log(state);
      let newState = {
        message: state.message + 1,
      };
      return newState;
    });
  };

  render() {
    const extendedName = this.props.name + " the developer";

    return (
      <div className="app">
        <FunctionalComponent
          name={extendedName}
          onClick={this.handleGreetingClick}
        />
        <div>{this.state.message}</div>
        {
          this.state.date ? <Clock date={this.state.date}/> : null
        }
      </div>
    );
  }
}

const App = () => {
  return <ClassComponent name="Valera" />;
};

export default App;
