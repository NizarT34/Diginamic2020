//Exercice Node

const http = require('http');
const ResponseWriter = require("./response-writer"); // Destructuring
const {URL} = require('url');



// La fonction anonyme est appelé lorsqu'il reçoit une requête
const server = http.createServer( (req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const responseWriter = new ResponseWriter(res); 
    if (req.url === '/hello'){
        responseWriter.hello();
    } else if(/^\/weather\?city=[0-9]{5}$/.test(req.url)){
        const city = reqUrl.searchParams.get('city');
        responseWriter.weather(city);
    } else if(req.url === '/'){
        responseWriter.index();
    } else if(req.url === '/image-meteo.jpg'){
        responseWriter.file("image-meteo.jpg")
        
    } else { //Error
        responseWriter.htmlError(404, "Introuvable !!!!!");
    }
    
});

server.listen(8080); 
