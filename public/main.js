const socket = io(); 

const divMessages = document.getElementById('messages'); 
const inputMessage = document.getElementById('mensaje'); 
const sendMessage = document.getElementById('enviar'); 
const inputNombre = document.getElementById('nombre'); 

sendMessage.addEventListener('click',(event)=>{
    const message = {
        texto: inputMessage.value,
        nombre:inputNombre.value,
    }; 
    socket.emit('newMessage',message); 
    inputMessage.value = ''
    console.log(message);
})


socket.on('messages',(messages)=>{
    divMessages.innerHTML = messages.map(message =>{
        return(
            `<div>
                <strong class="animate__animated animate__fadeIn">${message.nombre}</strong>
                <em class="animate__animated animate__fadeIn">${message.texto}</em>
            </div>`
        )
    })
})

