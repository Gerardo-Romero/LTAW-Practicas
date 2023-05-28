//-- Elementos del interfaz
const b1 = document.getElementById("b1");
const output = document.getElementById("output");
const barra = document.getElementById("barra");

//-- Crear un websocket. Se establece la conexión con el servidor
const socket = io();

let contador = 1;

socket.on("connect", () => {
  //-- Enviar mensaje inicial
  //--socket.send("Mensaje inicial del Cliente!!!");
  console.log("cáspita")
});  

socket.on("disconnect", ()=> {
  output.innerHTML="¡¡DESCONECTADO!!"
})

socket.on("message", (msg)=>{
  console.log(msg)
  output.innerHTML += '<p id="msg_servidor">' + msg + '</p>';
});

socket.on("server", (msg)=>{
  console.log(msg)
  output.innerHTML += '<p id="msg3">' + msg + '</p>';
});

//-- Al apretar el botón se envía un mensaje al servidor
b1.onclick = () => {
  console.log("boton pulsa")
  socket.emit("message",barra.value);
  output.innerHTML += '<p id="msg_cliente">' + barra.value + '</p>';

}












