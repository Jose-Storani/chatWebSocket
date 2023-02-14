

const socketCliente = io();

//elementos

const nombreUsuario = document.getElementById("nombreUsuario");

const formulario = document.getElementById("formulario");
const inputMensaje = document.getElementById("mensaje");
const chatParrafo = document.getElementById("chat")






let usuario = null;

if(!usuario){
    Swal.fire({
        title: "Bienvenido",
        text: "Ingresa tu usuario",
        input: "text",
        inputValidator: (value)=>{
            if(!value){
                return "Necesitas ingresar un usuario"
            }
        }
    })
    .then(username =>{
        usuario = username.value
        nombreUsuario.innerHTML = usuario;
        socketCliente.emit("nuevoUsuario",usuario)
    })
}

formulario.onsubmit = (e)=>{
    e.preventDefault();
    const info = {
        nombre: usuario,
        mensaje: inputMensaje.value
    }

    socketCliente.emit("mensaje",info)
    inputMensaje.value = ""

}

socketCliente.on("chat", (infoMensajes)=>{
console.log(infoMensajes);

const chatRender = infoMensajes.map(elem =>{
    return `<p><strong>${elem.nombre}:</strong>${elem.mensaje}</p>`
}).join(" ");
chatParrafo.innerHTML = chatRender
})

socketCliente.on("broadcast", usuario =>{
    Toastify({
        text: `Ingreso ${usuario} al chat`,
        duration: 5000,
        position: "right"
        
    }).showToast()
})
