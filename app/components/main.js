var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require("react-router");

var $ = require("jquery");

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;



var App = require("./app.js");
var Home = require("./home.js");
var Page = require("./page.js");
var Calling = require("./calling.js");
var Login = require("./login.js");
var Register = require("./register.js");

require("../../node_modules/bootstrap/dist/css/bootstrap.min.css");
require("../css/app.css");




// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
        	<IndexRoute component={Home} />
	        <Route name="page" path="/page" component={Page} />
	        <Route name="calling" path="/calling" component={Calling} />
		    <Route name="login" path="/login" component={Login} />
		    <Route name="register" path="/register" component={Register} />         
        </Route>
      </Router>
);

ReactDOM.render(routes, document.getElementById('content'));
