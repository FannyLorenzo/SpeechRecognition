const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnPlayText = document.getElementById('btnPlayText');

const texto = document.getElementById('texto');

const reconocimientoVoz = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition= new reconocimientoVoz()

recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interinResults = false;

recognition.onresult = (event)=>{
    console.log("entro aqui");
    console.log(event);
    const results = event.results;
    const frase = results[results.length-1][0].transcript;
    texto.value += frase;
    console.log(results);
    leerTextoCondicionado(texto.value);
}
recognition.onend = (event)=>{
    console.log("el microfono deja de escuchar");
}

recognition.onerror= (event)=>{
    console.log(event.error);
}

btnStart.addEventListener('click', () => {
    recognition.start();
});

btnStop.addEventListener('click', () => {
    recognition.abort();
});

btnPlayText.addEventListener('click', () => {
    leerTexto(texto.value);
});

const leerTexto = (texto) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = texto;
    speech.volume = 1
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

};
/* Función que condiciona la respuesta dependiendo de el contenido de la grabación 
** cada boton - tenga su papalabre clave en voz - active *
** el servicio * if (windows in spechrecosd / si / jsndd / ) - no continua escucha * operativo ||
*/
const leerTextoCondicionado = (mensaje)=>{
    const voz = new SpeechSynthesisUtterance()
    if(mensaje.includes('fin')){
        voz.text = 'Usted dijo la palabra clave - se culminó el picking'
        window.speechSynthesis.speak(voz)
        recognition.abort();
    }else{
        voz.text = 'siguiente producto'
        window.speechSynthesis.speak(voz)
    }
   
}


