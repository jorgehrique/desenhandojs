window.onload = () => {
    const largura = 400;
    const altura = 400;
    const espessura = 5;
    let desenhando = false;

    const canvas = document.getElementById("canvas");
    const btLimpar = document.getElementById("limpar");

    canvas.setAttribute("width", largura);
    canvas.setAttribute("height", altura);

    let contexto = canvas.getContext("2d");
    contexto.lineWidth = espessura;
    
    canvas.onmousedown = evento => {
        contexto.moveTo(evento.clientX, evento.clientY);
        desenhando = true;
    }

    canvas.onmouseup = () => {
        desenhando = false;
    }

    canvas.onmousemove = evento => {
        if (desenhando) {
            const x = evento.clientX - canvas.offsetLeft;
            const y = evento.clientY - canvas.offsetTop;
            contexto.lineTo(x, y);
            contexto.stroke();
        }
    }   

    btLimpar.onclick = () => {
        contexto.clearRect(0, 0, largura, altura);
        canvas.width = canvas.width;
        contexto.lineWidth = espessura;
    }
}