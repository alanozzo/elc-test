/**
 * The Server Can be configured and created here...
 * 
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details 
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const data      = require('./data');
const http      = require('http');
const hostname  = 'localhost';
const port      = 3035;
let listadoPorHacer = [];
const url = require('url');
/** 
 * Start the Node Server Here...
 * 
 * The http.createServer() method creates a new server that listens at the specified port.  
 * The requestListener function (function (req, res)) is executed each time the server gets a request. 
 * The Request object 'req' represents the request to the server.
 * The ServerResponse object 'res' represents the writable stream back to the client.
 */
http.createServer(function (request, response) {
    const { method, uri, headers } = request;
    //we get params
    const queryObject = url.parse(request.url,true).query;

    //create dynamic regex with sent param
    var regex = new RegExp(queryObject.name.toLowerCase() + ".*");

    //check for all coincidences in db
    let result = data.filter( function(item, index) {
        return item.name.toLowerCase().match(regex) && index < 4 && queryObject.name != '';
    });
    
    //set headers
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*"); //avoid cors in localhost
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS'); //avoid cors in localhost

    const responseBody = {
      headers,
      method,
      uri,
      result: result,
      count: data.length
    }
    
    response.write(JSON.stringify(responseBody))
    response.end(); //end the response
}).listen( port );


console.log(`[Server running on ${hostname}:${port}]`);
