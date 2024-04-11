const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');

const texto = document.getElementById('texto');

let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interinResults = false;

recognition.onresult = (event)   =>{
    const results = event.results;
    const frase = results[results.lenght-1][0].transcript;
    texto.value += frase;
    console.log(results);
};
recognition.onend = (event)   =>{
    console.log(event.error);
};

btnStart.addEventListener('click', () => {
    recognition.start();
});

btnStop.addEventListener('click', () => {
    recognition.abort();
});


