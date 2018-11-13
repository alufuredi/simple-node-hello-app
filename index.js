/*
 * Primary file for the API
 *
**/

// Dependencies
const http = require('http');
const url = require('url');

// The server responds only to /ping and /hello routes
const server = http.createServer((req, res)=>{

    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);

    // get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g,'')

    // choose handler the request should go to. If handler not found, the notFound handler should be used
    const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ?  router[trimmedPath] : handlers.notFound

    // route to the choosen handler
    chosenHandler((statusCode, payload)=>{

        // check statusCode is valid or default to 200
        statusCode = typeof(statusCode)==='number' ? statusCode : 200

        // check if the payload is valid or default to empty queryString
        payload = typeof(payload) === 'object' ? payload : {}

        // convert payload from object to JSON string
        const payloadString = JSON.stringify(payload)

        // return the response
        res.setHeader('Content-Type','application/json')
        res.writeHead(statusCode)
        res.end(payloadString)

        // log response to console
        console.log(`Response:  \n Status Code: ${statusCode}, \n Payload: ${payloadString}`)
        

    })
});

// start the server and listen on port 3000
server.listen(3000, ()=>{
    console.log('The server is listening on port 3000 now.')
})

const handlers = {}

// Ping handler
handlers.ping = (callback) => {
  callback(200)
}

// Hello handler
handlers.hello = (callback) => {
  const data = 'Hello there!'
  callback(200, {data})
}

// not found handler
handlers.notFound = (callback) => {
    callback(404)
}

const router = {
  'ping': handlers.ping,
  'hello': handlers.hello
}
