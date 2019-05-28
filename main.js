//Load the required libs
const express = require('express');

//Tunables
const PORT = parseInt(process.argv[2] || process.env.APP_PORT || 3000);

//Create an instance of express
const app = express();

let count = 0;

//Routing rules
// GET /time -> HTML
app.get('/time', (req, resp) => {
    console.log('Request User-Agent: ', req.get('User-Agent'));
    //Set the status - 200
    resp.status(200);
    //Set the Content-Type header
    resp.type('text/html');
    //Set my own custom header
    resp.set('X-Counter', count++);
    //Send the data
    resp.send(`<h1>The current time is ${new Date()}</h1>`);
});

app.get('/time/json', (req, resp) => {
    resp.status(200);
    //MIME type
    resp.type('application/json');
    //Return json
    resp.json({ time: (new Date()).getTime() });
})

app.use(express.static(__dirname + '/public'));


app.use((req, resp) => {
    resp.status(404);
    resp.type('text/html');
    resp.send(`<h2>Cannot find ${req.originalUrl} </h2>`)
})

//start the server
app.listen(PORT, () => {
    console.info(` This pplication started at ${new Date()} on port ${PORT}`);
});