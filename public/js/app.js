webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(158);
	var ReactRouter = __webpack_require__(159);

	var $ = __webpack_require__(210);

	var Router = ReactRouter.Router;
	var Route = ReactRouter.Route;
	var IndexRoute = ReactRouter.IndexRoute;

	var App = __webpack_require__(211);
	var Home = __webpack_require__(213);
	var Page = __webpack_require__(214);
	var Calling = __webpack_require__(216);
	var Login = __webpack_require__(217);
	var Register = __webpack_require__(218);

	__webpack_require__(219);
	__webpack_require__(228);

	// Run the routes
	var routes = React.createElement(
	      Router,
	      null,
	      React.createElement(
	            Route,
	            { name: "app", path: "/", component: App },
	            React.createElement(IndexRoute, { component: Home }),
	            React.createElement(Route, { name: "page", path: "/page", component: Page }),
	            React.createElement(Route, { name: "calling", path: "/calling", component: Calling }),
	            React.createElement(Route, { name: "login", path: "/login", component: Login }),
	            React.createElement(Route, { name: "register", path: "/register", component: Register })
	      )
	);

	ReactDOM.render(routes, document.getElementById('content'));

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(3);


/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var History = ReactRouter.History;

	var auth = __webpack_require__(212);

	var App = React.createClass({
	  displayName: "App",

	  // mixin for navigation
	  mixins: [History],

	  // initial state
	  getInitialState: function () {
	    return {
	      // the user is logged in
	      loggedIn: auth.loggedIn()
	    };
	  },

	  // callback when user is logged in
	  setStateOnAuth: function (loggedIn) {
	    this.setState({ loggedIn: loggedIn });
	  },

	  // when the component loads, setup the callback
	  componentWillMount: function () {
	    auth.onChange = this.setStateOnAuth;
	  },

	  // logout the user and redirect to home page
	  logout: function (event) {
	    auth.logout();
	    this.history.pushState(null, '/');
	  },

	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "nav",
	        { className: "navbar navbar-default", role: "navigation" },
	        React.createElement(
	          "div",
	          { className: "container" },
	          React.createElement(
	            "div",
	            { className: "navbar-header" },
	            React.createElement(
	              "button",
	              { type: "button", className: "navbar-toggle", "data-toggle": "collapse", "data-target": "#bs-example-navbar-collapse-1" },
	              React.createElement(
	                "span",
	                { className: "sr-only" },
	                "Toggle navigation"
	              ),
	              React.createElement("span", { className: "icon-bar" }),
	              React.createElement("span", { className: "icon-bar" }),
	              React.createElement("span", { className: "icon-bar" })
	            ),
	            React.createElement(
	              "a",
	              { className: "navbar-brand", href: "/" },
	              "Callings"
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "collapse navbar-collapse", id: "bs-example-navbar-collapse-1" },
	            this.state.loggedIn ? React.createElement(
	              "ul",
	              { className: "nav navbar-nav" },
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "#/page" },
	                  "Page"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "#/calling" },
	                  "Calling"
	                )
	              ),
	              React.createElement(
	                "li",
	                null,
	                React.createElement(
	                  "a",
	                  { href: "#", onClick: this.logout },
	                  "Logout"
	                )
	              )
	            ) : React.createElement("div", null)
	          )
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "container" },
	        this.props.children
	      )
	    );
	  }
	});

	module.exports = App;

/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(210);

	// authentication object
	var auth = {
	  register: function (name, username, password, cb) {
	    // submit request to server, call the callback when complete
	    var url = "/api/users/register";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'POST',
	      data: {
	        name: name,
	        username: username,
	        password: password
	      },
	      // on success, store a login token
	      success: (function (res) {
	        localStorage.token = res.token;
	        localStorage.name = res.name;
	        this.onChange(true);
	        if (cb) cb(true);
	      }).bind(this),
	      error: (function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        this.onChange(false);
	        if (cb) cb(false);
	      }).bind(this)
	    });
	  },
	  // login the user
	  login: function (username, password, cb) {
	    // submit login request to server, call callback when complete
	    cb = arguments[arguments.length - 1];
	    // check if token in local storage
	    if (localStorage.token) {
	      this.onChange(true);
	      if (cb) cb(true);
	      return;
	    }

	    // submit request to server
	    var url = "/api/users/login";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'POST',
	      data: {
	        username: username,
	        password: password
	      },
	      success: (function (res) {
	        // on success, store a login token
	        localStorage.token = res.token;
	        localStorage.name = res.name;
	        this.onChange(true);
	        if (cb) cb(true);
	      }).bind(this),
	      error: (function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        this.onChange(false);
	        if (cb) cb(false);
	      }).bind(this)
	    });
	  },
	  // get the token from local storage
	  getToken: function () {
	    return localStorage.token;
	  },
	  // get the name from local storage
	  getName: function () {
	    return localStorage.name;
	  },
	  // logout the user, call the callback when complete
	  logout: function (cb) {
	    delete localStorage.token;
	    this.onChange(false);
	    if (cb) cb();
	  },
	  // check if user is logged in
	  loggedIn: function () {
	    return !!localStorage.token;
	  },
	  // default onChange function
	  onChange: function () {}
	};

	module.exports = auth;

/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);

	var Link = ReactRouter.Link;

	// Home page, which shows Login and Register buttons
	var Home = React.createClass({
	  displayName: "Home",

	  render: function () {
	    return React.createElement(
	      "p",
	      null,
	      React.createElement(
	        Link,
	        { className: "btn btn-default", to: "login" },
	        "Login"
	      ),
	      " or ",
	      React.createElement(
	        Link,
	        { className: "btn btn-warning", to: "register" },
	        "Register"
	      )
	    );
	  }
	});

	module.exports = Home;

/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var History = ReactRouter.History;

	var api = __webpack_require__(215);
	var auth = __webpack_require__(212);

	var Page = React.createClass({
	  displayName: "Page",

	  // context so the component can access the router
	  contextTypes: {
	    location: React.PropTypes.object
	  },

	  // initial state
	  getInitialState: function () {
	    return {
	      // list of items in the todo list
	      items: []
	    };
	  },

	  render: function () {
	    var name = auth.getName();
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h1",
	        null,
	        "Page"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "Demo another page here ",
	        name
	      )
	    );
	  }
	});

	module.exports = Page;

/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(210);

	// API object
	var api = {
	  // get the list of items, call the callback when complete
	  getItems: function (cb) {
	    var url = "/api/items";
	    $.ajax({
	      url: url,
	      dataType: 'json',
	      type: 'GET',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is an error, remove the login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  },
	  // add an item, call the callback when complete
	  addItem: function (title, cb) {
	    var url = "/api/items";
	    $.ajax({
	      url: url,
	      contentType: 'application/json',
	      data: JSON.stringify({
	        item: {
	          'title': title
	        }
	      }),
	      type: 'POST',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is an error, remove the login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  },
	  // update an item, call the callback when complete
	  updateItem: function (item, cb) {
	    var url = "/api/items/" + item.id;
	    $.ajax({
	      url: url,
	      contentType: 'application/json',
	      data: JSON.stringify({
	        item: {
	          title: item.title,
	          completed: item.completed
	        }
	      }),
	      type: 'PUT',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is any error, remove any login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  },
	  // delete an item, call the callback when complete
	  deleteItem: function (item, cb) {
	    var url = "/api/items/" + item.id;
	    $.ajax({
	      url: url,
	      type: 'DELETE',
	      headers: { 'Authorization': localStorage.token },
	      success: function (res) {
	        if (cb) cb(true, res);
	      },
	      error: function (xhr, status, err) {
	        // if there is an error, remove any login token
	        delete localStorage.token;
	        if (cb) cb(false, status);
	      }
	    });
	  }

	};

	module.exports = api;

/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var History = ReactRouter.History;

	var api = __webpack_require__(215);
	var auth = __webpack_require__(212);

	var Calling = React.createClass({
	  displayName: "Calling",

	  // context so the component can access the router
	  contextTypes: {
	    location: React.PropTypes.object
	  },

	  // initial state
	  getInitialState: function () {
	    return {
	      // list of items in the todo list
	      items: []
	    };
	  },

	  render: function () {
	    var name = auth.getName();
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h1",
	        null,
	        "Enter your calling"
	      ),
	      React.createElement(
	        "p",
	        null,
	        "You will be able to collaborate and get ideas from others who hold or have held your calling"
	      )
	    );
	  }
	});

	module.exports = Calling;

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var History = ReactRouter.History;

	var auth = __webpack_require__(212);

	// Login page, shows the login form and redirects to the list if login is successful
	var Login = React.createClass({
	  displayName: "Login",

	  // mixin for navigation
	  mixins: [History],

	  // initial state
	  getInitialState: function () {
	    return {
	      // there was an error on logging in
	      error: false
	    };
	  },

	  // handle login button submit
	  login: function (event) {
	    // prevent default browser submit
	    event.preventDefault();
	    // get data from form
	    var username = this.refs.username.value;
	    var password = this.refs.password.value;
	    if (!username || !password) {
	      return;
	    }
	    // login via API
	    auth.login(username, password, (function (loggedIn) {
	      // login callback
	      if (!loggedIn) return this.setState({
	        error: true
	      });
	      this.history.pushState(null, '/page');
	    }).bind(this));
	  },

	  // show the login form
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h2",
	        null,
	        "Login"
	      ),
	      React.createElement(
	        "form",
	        { className: "form-vertical", onSubmit: this.login },
	        React.createElement("input", { type: "text", placeholder: "Username", ref: "username", autoFocus: true }),
	        React.createElement("input", { type: "password", placeholder: "Password", ref: "password" }),
	        React.createElement("input", { className: "btn btn-warning", type: "submit", value: "Login" }),
	        this.state.error ? React.createElement(
	          "div",
	          { className: "alert" },
	          "Invalid username or password."
	        ) : null
	      )
	    );
	  }
	});

	module.exports = Login;

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var ReactRouter = __webpack_require__(159);
	var History = ReactRouter.History;

	var auth = __webpack_require__(212);

	// Register page, shows the registration form and redirects to the list if login is successful
	var Register = React.createClass({
	  displayName: "Register",

	  // mixin for navigation
	  mixins: [History],

	  // initial state
	  getInitialState: function () {
	    return {
	      // there was an error registering
	      error: false
	    };
	  },

	  // handle regiser button submit
	  register: function (event) {
	    // prevent default browser submit
	    event.preventDefault();
	    // get data from form
	    var name = this.refs.name.value;
	    var username = this.refs.username.value;
	    var password = this.refs.password.value;
	    if (!name || !username || !password) {
	      return;
	    }
	    // register via the API
	    auth.register(name, username, password, (function (loggedIn) {
	      // register callback
	      if (!loggedIn) return this.setState({
	        error: true
	      });
	      this.history.pushState(null, '/page');
	    }).bind(this));
	  },

	  // show the registration form
	  render: function () {
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "h2",
	        null,
	        "Register"
	      ),
	      React.createElement(
	        "form",
	        { className: "form-vertical", onSubmit: this.register },
	        React.createElement("input", { type: "text", placeholder: "Name", ref: "name", autoFocus: true }),
	        React.createElement("input", { type: "text", placeholder: "Username", ref: "username" }),
	        React.createElement("input", { type: "password", placeholder: "Password", ref: "password" }),
	        React.createElement("input", { className: "btn", type: "submit", value: "Register" }),
	        this.state.error ? React.createElement(
	          "div",
	          { className: "alert" },
	          "Invalid username or password."
	        ) : null
	      )
	    );
	  }
	});

	module.exports = Register;

/***/ },

/***/ 219:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 228:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

});