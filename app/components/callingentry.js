var React = require("react");

var api = require("./api.js");

// List entry component, handles adding new items to the list
var CallingEntry = React.createClass({
  // handles submit event for adding a new item
  addCalling: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var title = this.refs.title.value;
    if (!title) {
      return;
    }
    // call API to add calling, and reload once added
    api.addCalling(title, this.props.name, this.props.reload);
    this.refs.title.value = '';
  },

  // render the item entry area
  render: function() {
    return (
      <header id="input">
        <form id="calling-form" name="callingForm" onSubmit={this.addCalling}>
          <input type="text" id="new-calling" ref="title" placeholder="Enter your calling" autoFocus={true} />
        </form>
      </header>
    );

  }
});

module.exports = CallingEntry;
