const http = require('http');
const fs = require('fs');
const { error } = require('console');

function print_info_req(req) {

  console.log("");
  console.log("Mensaje de solicitud");
  console.log("====================");
  console.log("Método: " + req.method);
  console.log("Recurso: " + req.url);
  console.log("Version: " + req.httpVersion)
  console.log("Cabeceras: ");

  for (hname in req.headers)
    console.log(`  * ${hname}: ${req.headers[hname]}`);

  const myURL = new URL(req.url, 'http://' + req.headers['host']);
  console.log("URL completa: " + myURL.href);
  console.log("  Ruta: " + myURL.pathname);

  return myURL
}

//-- Definir el puerto a utilizar
const PUERTO = 9000;

//-- Crear el servidor
const server = http.createServer((req, res) => {
    
  //-- Indicamos que se ha recibido una petición
  console.log("Petición recibida!");
  let URL = print_info_req(req)
  //-- Enviar una respuesta:. Siempre es la misma respuesta
  //-- Con el método res.write() se escribe el mensaje en el 
  //-- cuerpo de la respuesta
  if (URL.pathname == '/'){
    URL.pathname = 'tienda.html'
  }
  
  fs.readFile(URL.pathname.slice(1),(err, data) => { 
    if(!err){
      
      res.write(data);
      res.end();
    }else{
      res.write('error404');
      res.end();
    }
    

  //-- Terminar la respuesta y enviarla
    

  });

  
});

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);

console.log("Happy server activado!. Escuchando en puerto: " + PUERTO);