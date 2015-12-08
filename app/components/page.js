var React = require("react");
var ReactRouter = require("react-router");
var History = ReactRouter.History;

var api = require("./api.js");
var auth = require("./auth.js");

var Page = React.createClass({

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
        <h1>Page</h1>
        <p>Demo another page here {name}</p>
      </div>
    );
  }
});


module.exports = Page;