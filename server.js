// localhost:XXXX.
// the route of any website is composed of the slashes ex: google.com/ROUTE/SUBROUTE.

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const path = require('path');

const api_routes = require('./routes/api_routes');


// Share Static/Browser Files.
app.use(express.static(path.join(__dirname, 'browser'))); // __dirname outputs an absolute path from the root directory. This is looking for the index.html file.

//Attach client side form data to the request.body object.
app.use(express.urlencoded({extended: true}));

//Allows JSON data to be received from client.
app.use(express.json());

// Load Routes
// localhost:3333/api
app.use('/api', api_routes); // this means that we have to start all of the routes in the api_routes with /api/ ex: localhost:3333/api/test




// Start Server
app.listen(PORT, () => { // first objext is the port number.
    console.log(`Listening on port ${PORT}`); // this just shows that the server is running.
}); 



//----------------------------------------------//

// //four types of request get(read data), post(insert data), put(updated data), delete(delete data);




// app.get('/', (request, response) => { // pass in two objects into the callback of a get request. (request, and response)
//     response.send('works!');
// }) // when our client sends a get request to our server we respond and send works!