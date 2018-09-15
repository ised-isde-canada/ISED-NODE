var express = require('express');
var cors = require('cors');

var app = express();

// Enable CORS for all requests
//app.use(cors());

var corsOptions = {
  origin: /df24\.ised-dev\.openshiftapps\.com$/,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

app.use(cors(corsOptions));

// allow serving of static files from the public directory
app.use(express.static(__dirname + '/public'));

// serve requests using the following paths 
app.use('/threescale', require('./lib/threescale.js')());

// default port is 8001
var port = process.env.FH_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8001;
var host = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.listen(port, host, function() {
  console.log("App started at: " + new Date() + " on port: " + port); 
});
