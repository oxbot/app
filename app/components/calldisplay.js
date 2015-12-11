var React = require("react");

var api = require("./api.js");

// Item shown in the todo list
var CallDisplay = React.createClass({
  
  // render the calling
  render: function() {
   
    return (
        <div className="view">
          <p>{this.props.calling}</p>
        </div>
    );
  }
});

module.exports = CallDisplay;
