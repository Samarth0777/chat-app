// const { text } = require("express");

const socket = io()
var audio=new Audio('ting.mp3')

let nam;
let textarea=document.querySelector('#input')
let messageArea = document.querySelector('.container')
do {
   nam= prompt('Enter your name ')
} while(!nam)

textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value)
    }
})


function sendMessage(message){
    let msg={
        user: nam,
        message: message.trim()
    }

    appendMessage(msg,'sender')
    textarea.value=''
    scroll()

    socket.emit('message', msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'msg-box')

    let markup = `
    
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>

    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    
}

//Receiving Message

socket.on('message',(msg)=>{
    appendMessage(msg,'receiver')
    scroll()
    audio.play();
})


function scroll(){
    messageArea.scrollTop=messageArea.scrollHeight
}