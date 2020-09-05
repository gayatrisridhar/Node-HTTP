//to use the node http module
const http = require("http"); //the inbuilt module 'http' allows node.js to transfer data over http.
const fs = require("fs"); //The fs module is responsible for all the asynchronous or synchronous file I/O operations.
const path = require("path"); //The path module provides utilities for working with file and directory paths.

const hostname = "localhost";
const port = 3000;

//req is the incoming request from any browser that is trying to access this particular server
//statusCode helps us to set up the status code for the response message

//createServer():(1)is a method that turns your computer into an HTTP server
//(2)it listens to ports on the computer and executes a function each time a request is made.

const server = http.createServer((req, res) => {
  console.log("Request for " + req.url + " by method " + req.method);

  if (req.method == "GET") {
    var fileUrl;
    if (req.url == "/") fileUrl = "/index.html";
    else fileUrl = req.url; //req.url contains the url of the request

    var filePath = path.resolve("./public" + fileUrl); //gives the full path of the file/absolute path me resolve krta hai
    const fileExt = path.extname(filePath); //takes the file extension

    if (fileExt == ".html") {
      //The fs.exists() method is used to test whether the given path exists or not in the file system.
      fs.exists(filePath, (exists) => {
        if (!exists) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            "<html><body><h1>Error 404: " +
              fileUrl +
              " not found</h1></body></html>"
          );
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res); //this function reads the file from the filepath,then it converts it into a
        //stream of bytes then pipes it through and includes it in the body of the response
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        "<html><body><h1>Error 404: " +
          fileUrl +
          " not a HTML file</h1></body></html>"
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<html><body><h1>Error 404: " +
        req.method +
        " not supported</h1></body></html>"
    );
  }

  //pehla wala code hai yeh comments me
  //res.statusCode = 200;
  //res.setHeader("Content-text", "text/html"); //it sets the type of value to be held inside the body of res message
  //res.end("<html><body><h1>Hey smile a little bit more:)</h1></body></html>"); //it end the res and send the content contained in it back to the client
}); //it takes function as its argument

//to start a server you enter the following code
//what listen does is, the server listens for any new incoming requests on the mentioned port
server.listen(port, hostname, () => {
  console.log(`the server is up and running at http://${hostname}:${port}`);
}); //we are using backticks in the function because e need to display the values of the variables
