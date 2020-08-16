//to use the node http module
const http = require("http"); //the inbuilt module 'http' allows node.js to transfer data over http

const hostname = "localhost";
const port = 3000;

//req is the incoming request from any browser that is trying to access this particular server
//statusCode hepls us to set up the status code for the response message
const server = http.createServer((req, res) => {
  console.log(req.headers);

  res.statusCode = 200;
  res.setHeader("Content-text", "text/html"); //it sets the type of value to be held inside the body of res message
  res.end("<html><body><h1>Hey smile a little bit more:)</h1></body></html>"); //it end the res and send the content contained in it back to the client
}); //it takes function as its argument

//to start a server you enter the following code
//what listen does is, the server listens for any new incoming requests on the mentioned port
server.listen(port, hostname, () => {
  console.log(`the server is up and running at http://${hostname}:${port}`);
}); //we are using backticks in the function because e need to display the values of the variables
