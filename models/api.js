var app = require('./express.js');
var User = require('./user.js');

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//
// API
//

// register a user
app.post('/api/users/register', function (req, res) {
  // find or create the user with the given username
  User.findOrCreate({username: req.body.username}, function(err, user, created) {
    if (created) {
      // if this username is not taken, then create a user record
      user.name = req.body.name;
      user.set_password(req.body.password);
      user.save(function(err) {
	if (err) {
	  res.sendStatus("403");
	  return;
	}
        // create a token
	var token = User.generateToken(user.username);
        // return value is JSON containing the user's name and token
        res.json({name: user.name, token: token});
      });
    } else {
      // return an error if the username is taken
      res.sendStatus("403");
    }
  });
});

// login a user
app.post('/api/users/login', function (req, res) {
  // find the user with the given username
  User.findOne({username: req.body.username}, function(err,user) {
    if (err) {
      res.sendStatus(403);
      return;
    }
    // validate the user exists and the password is correct
    if (user && user.checkPassword(req.body.password)) {
      // create a token
      var token = User.generateToken(user.username);
      // return value is JSON containing user's name and token
      res.json({name: user.name, token: token});
    } else {
      res.sendStatus(403);
    }
  });
});

// add a calling to a user
app.post('/api/users/addcalling', function (req,res) {
  // validate the supplied token
  console.log("in add calling");
  // get indexes
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, update the calling for the user
      console.log(req.body.user.calling);
      console.log(req.body.user.username);
      User.update({username:req.body.user.username},{calling:req.body.user.calling}, function(err,item) {
  if (err) {
    res.sendStatus(403);
    return;
  }
  console.log(item);
  res.json({call: user.calling});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// get all items for the user
app.get('/api/getcalling', function (req,res) {
  console.log("in get calling");
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      
      // if the token is valid, find all the user's items and return them
      User.find({user:user.id}, function(err, items) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
  console.log(items);
	// return value is user's calling
	res.json({calling: user.calling});
      });
    } else {
      res.sendStatus(403);
    }
  });
});



/*
// get an item
app.get('/api/items/:item_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested item
      Item.findById(req.params.item_id, function(err, item) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
        // get the item if it belongs to the user, otherwise return an error
        if (item.user != user) {
          res.sendStatus(403);
	  return;
        }
        // return value is the item as JSON
        res.json({item:item});
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// update an item
app.put('/api/items/:item_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested item
      Item.findById(req.params.item_id, function(err,item) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
        // update the item if it belongs to the user, otherwise return an error
        if (item.user != user.id) {
          res.sendStatus(403);
	  return;
        }
        item.title = req.body.item.title;
        item.completed = req.body.item.completed;
        item.save(function(err) {
	  if (err) {
	    res.sendStatus(403);
	    return;
	  }
          // return value is the item as JSON
          res.json({item:item});
        });
      });
    } else {
      res.sendStatus(403);
    }
  });
});

// delete an item
app.delete('/api/items/:item_id', function (req,res) {
  // validate the supplied token
  user = User.verifyToken(req.headers.authorization, function(user) {
    if (user) {
      // if the token is valid, then find the requested item
      Item.findByIdAndRemove(req.params.item_id, function(err,item) {
	if (err) {
	  res.sendStatus(403);
	  return;
	}
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
});
*/
