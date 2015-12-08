var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var api = require("./api.js");
var auth = require("./auth.js");

var Calling = React.createClass({

  // context so the component can access the router
  contextTypes: {
    location: React.PropTypes.object
  },

  // initial state
  getInitialState: function() {
    return {
      // list of items in the todo list
      items: [],
    };
  },

  
  render: function() {
    var name = auth.getName();
    return (
      <div>
        <h1>Enter your calling</h1>
        <p>You will be able to collaborate and get ideas from others who hold or have held your calling</p>
      </div>
    );
  }
});


module.exports = Calling;