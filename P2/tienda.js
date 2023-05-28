const http = require('http');
//-- Importar el módulo FS

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
//-- 2º Conectarme a la base de datos


console.log("Lectura síncrona de un fichero");

//-- Realizar la lectura
const basedatos = JSON.parse(fs.readFileSync('tienda.json','utf8')); 

//-- Esta instrucción se ejecuta una vez terminada
//-- la lectura síncrona
console.log("Lectura completada...")

//-- Mostrar el contenido del fichero
console.log("Contenido del fichero: \n")
console.log(basedatos);

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
  }else if(URL.pathname == '/BuscarProducto'){
    //-- 1º Extraer parametro url
      let productFind = URL.searchParams.get("producto");
      console.log(productFind)
      
    //-- 3º Buscar en la base de datos
    
      const FArray = []
      for(let i=0;i<basedatos.productos.length;i++){
        if (basedatos.productos[i].name.toUpperCase().startsWith(productFind.toUpperCase())) {
          FArray.push([basedatos.productos[i].name , basedatos.productos[i].type.toLowerCase()]);
        }
      }


       //-- 4º Responder 
      res.statusCode = 200;
      res.statusMessage = "OK"
      res.write(JSON.stringify(FArray));

      res.end();
  

   

  }else{
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
  };
});

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);

console.log("Happy server activado!. Escuchando en puerto: " + PUERTO);

//-- Ahora categorías


