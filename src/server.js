import express from "express";
import __dirname from "./utilities.js";
import handlebars from "express-handlebars"
import viewsRouter from "./router/views.router.js"
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//archivos estaticos
app.use(express.static(__dirname + "/public"));


//ruta raiz
app.use("/", viewsRouter)


//config handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");




const httpServer = app.listen(8080,()=>{
    console.log("Escuchando 8080")
});

const mensajes =[]

//websocket
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) =>{    
    console.log(`Usuario conectado ${socket.id}`)

    socket.on("disconnect",()=> {
        console.log("Usuario desconectado")
    })

    socket.on("nuevoUsuario",(usuario)=>{
        socket.broadcast.emit("broadcast", usuario )
    })

    socket.on("mensaje",(info) =>{
        mensajes.push(info);
        socketServer.emit("chat", mensajes)
    })

    //emit sirve para emitir eventos
    // socket.emit("saludo", "Bienvenido a socket")

    // socket.on("respuestaSaludo",(mensaje)=>{
    //     console.log(mensaje)
    // })

    // socket.on("mensaje",(obj)=>{
    //     mensajes.push(obj);
    //     console.log(obj)
    //     socketServer.emit("mensajes", mensajes) //ACA EMITIMOS A NIVEL DE SERVIDOR Y NO A NIVEL UNICO DE CLIENTE
    // })
})