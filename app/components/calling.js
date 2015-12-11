var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var api = require("./api.js");
var auth = require("./auth.js");
var CallingEntry = require("./callingentry.js");
var CallDisplay = require("./calldisplay.js");

var Calling = React.createClass({

  // context so the component can access the router
  contextTypes: {
    location: React.PropTypes.object
  },

    // initial state
  getInitialState: function() {
    return {
      //calling of user
      calling: '',
    };
  },

    // reload the list of items
  reload: function() {
    api.getCalling(this.setCalling);
  },

  // callback for getting the list of items, sets the list state
  setCalling: function(status, data) {
    if (status) {
      // set the state for the list of items
      this.setState({
        calling: data.calling
      });
    } else {
      // if the API call fails, redirect to the login page
      this.context.router.transitionTo('/login');
    }
  },

  
  render: function() {
    var name = auth.getName();
    return (
      <div>
        <h1>Enter your calling</h1>
        <CallingEntry name={name} reload={this.reload}/>
        <p>You will be able to collaborate and get ideas from others who hold or have held the same calling</p>
        <CallDisplay calling={this.state.calling} reload={this.reload}/>
      </div>
    );
  }
});


module.exports = Calling;