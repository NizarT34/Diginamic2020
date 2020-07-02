const https = require('https');
const fs = require('fs');
const zlib = require('zlib');

class ResponseWriter {
    constructor(res){
      this.res = res;
    } 

    hello() {
      const now = new Date();
      const timeString = `${('0' + now.getHours()).slice(-2)}:${('0' + now.getMinutes()).slice(-2)}`; //On concatène le 0 devant, si l'heure ou les minutes sont en dessous 10
      this.res.writeHead(200, {'Content-Type': 'text/html'});
      // this.res.write('Bon');
      // this.res.write('jour ! '); On peut faire des write pour écrire du contenu, mais on est obligé d'appeler la méthode end pour la réponse
      
      this.htmlSucess(`
                  <h1>Heure du serveur</h1>
                  <p>Bonjour, il est : ${timeString}</p>
                    `);
    }

    weather(city){
        const token = '08ddcc5675b44ea1f2c567010e544d25c47ca45a8392efc9ff693e471ebee936';
        const weatherApiUrl = `https://api.meteo-concept.com/api/forecast/daily?insee=${city}&token=${token}`;
        const headers = {Accept: 'application/json'};
        https.get(weatherApiUrl, {headers}, (apiResponse) => { 
            let responseData = '';
            apiResponse.on('data', chunk => {
              //console.log("Le chunk "+ chunk);
              responseData += chunk
            });
            apiResponse.on('end', () => {
                const json = JSON.parse(responseData);
                console.log('Code : ', json.code);
                
                if(json.code){
                  this.htmlError(400, 'code faux')
                } else {
                  const tableRows = json.forecast.map(f => 
                    `<tr><td>${f.tmin}</td><td>${f.tmax}</td></tr>`).join('');
                this.htmlSucess(`
                            <h1>Météo à : ${json.city.name}</h1>
                            <table>
                                <tr><th>T° min</th> <th>T° max</th></tr>
                                ${tableRows}
                            </table>
                            <form method="get" action="weather">
                              Choisir une autre ville (code INSEE) : 
                              <input type="text" name="city"/>
                              <button type="submit">Rechercher</button>
                            </form>`);
                }
                
            })
            
        })
    }

    index() {
      this.htmlSucess(`<h1>
        Accueil
        </h1>
        <p><img src="image-meteo.jpg" alt=""/></p>
        <ul>
          <li><a href="/hello">Heure du serveur</a></li>
          <li><a href="weather?city=34172">Météo Montpellier ou ailleurs</a></li>
        </ul>
      `)
    }

    file(filename){
      this.res.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Encoding': 'gzip'});
      const path = __dirname + '/' + filename;
      const fileReadable = fs.createReadStream(path);
      fileReadable.on('end', () => console.log("Lecture terminée"));
      const gzip = zlib.createGzip();
      fileReadable.pipe(gzip).pipe(this.res);
    }

    htmlSucess(bodyContent) {
      this.res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      this.res.end(`<html><body>${bodyContent}</body></html>`);
    }

    htmlError(status, message){
      this.res.writeHead(status, {'Content-Type': 'text/html; charset=utf-8'});
      this.res.end(`<html><body>${message}</body></html>`);
    }

    
}

module.exports = ResponseWriter;