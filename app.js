// Express is a fast, unopinionated, minimalist web framework for node. It provides small, robust tooling for HTTP servers, 
// making it a great solution for single page applications, web sites, hybrids, or public HTTP APIs. It does not force you 
// to use any specific ORM or template engine. Express is a framework for developing servers. It is not a server by itself.
var express = require('express');

// Cheerio parses markup and provides an API for traversing or manipulating the resulting data structure. It does not 
// interpret the result as a web browser does.
var cheerio = require('cheerio');

// Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects 
// by default.
var request = require('request');


var app = express();

var apiWOTD = [];


// Routing refers to how an application’s endpoints (URIs) respond to client requests. 

// A route method is derived from one of the HTTP methods, and is attached to an instance of the express class. 
// Express supports methods that correspond to all HTTP request methods: get, post, etc.
// The following code is an example of routes that are defined for the GET and the POST methods to the root of the app.

app.get('/', function (req, res) {

  // allow access from other domains

  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Headers', 'X-Requested-With');

  
  // Routing methods specify a callback function (sometimes called “handler functions”) called when the application receives a 
  // request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match 
  // the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.
  // In fact, the routing methods can have more than one callback function as arguments. 
  // With multiple callback functions, it is important to provide next as an argument to the callback function and then call 
  // next() within the body of the function to hand off control to the next callback.

  // Use Cheerio to make the request

  request({

    method: 'GET',

    url: 'http://www.wordthink.com'

    }, function(err, response, body, callback) {

      if (err) return console.error(err);

      // Get the HTML body from WordThink.com
      // ...With Cheerio, we need to pass in the HTML document (load in the HTML).
      // ...This step in jQuery is implicit, since jQuery operates on the one, baked-in DOM.
      $ = cheerio.load(body);

      // Clear the previous requests word of the day. 
      // If not cleared then will keep adding to array.
      if(apiWOTD.length > 0){

        apiWOTD = [];

      }


      // load HTML div tag with "post" class under content" ID and "singlemeta" class first-child
      // The :first-child selector is used to select the specified selector, only if it is the first child of its parent

      var post = $('#content .singlemeta:first-child .post');

   
      // find HTML heading tag with attribute class title text, replacing new lines, carriage returns, tabs with null - removing them from the text.
      // LF -> /n
      // CR -> /r
      // TB -> /t
      var word = post.find('.title').eq(0).text().replace('\n\t\t\t\t\t', '').replace('\r\n\t\t\t\t', '').replace('\n\t\t\t\t', '');

      // find HTML paragraph tag text, replacing new line(s) with null - removing line breaks from the text.
      var definition = post.find('p').eq(0).text().replace('\n', '');


      // create an object, push word and definition text onto the array apiWTOD

      apiWOTD.push({word: word, definition: definition})


  });


  // return a JSON object as a response
  // Route paths, in combination with a request method, define the endpoints at which requests can be made. 
  // Route paths can be strings, string patterns, or regular expressions.
  // This route path will match requests to the root route, /.

  res.send(JSON.stringify(apiWOTD, null, 4));

  // The JSON.stringify() method converts a JavaScript value to a JSON string, optionally replacing values if a 
  // replacer function is specified or optionally including only the specified properties if a replacer array is specified.
  // replacer of null or not provided, means all properties of the object are included in the resulting JSON string.
  // A String or Number object that's used to insert white space into the output JSON string for readability purposes (number of space characters to use)
});



// start app on localhost port 3000

var port = process.env.PORT || 3000;

app.listen(port, function () {

  console.log('listening on port ' + port);

});