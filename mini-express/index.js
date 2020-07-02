const miniExpress = require('./mini-express');
const fs = require('fs');
const app = miniExpress();


// // Première méthode utilisée pour faire une requête 
// app.use((req, res, next) => {
//   /** Ici on a créé un middleware avec la fonction fléchée (req, res, next), mais normalement on doit passer   */
//     if (req.method.toLowerCase() === 'get' && req.url === '/toto.ico') {
//       res.writeHead(200, {'Content-Type': 'image/x-icon'});
//       const iconReadable = fs.createReadStream(__dirname+'/favicon.ico');
//       iconReadable.pipe(res);
//       // .on('finish');{ /**Dans le cas où on doit passer au next juste apres le traitement */
//       //   next();
//       // }

//     } else {
//       next();
//     }
// });

// // Deuxième méthode utilisée
const favicon = (iconPath) => {
  return ((req, res, next) => {
        if (req.method.toLowerCase() === 'get' && req.url === '/favicon.ico') {
          res.writeHead(200, {'Content-Type': 'image/x-icon'});
          const iconReadable = fs.createReadStream(iconPath);
          iconReadable.pipe(res);
        } else {
          next();
        }
  });
}

app.use(favicon(__dirname + '/toto.ico'));

  
app.get('/',(req, res) => {
  res.end('Hello World!');
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!');
});


