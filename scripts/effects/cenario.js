let pedras = [];
let plantas = [];

let imagemFundo = new Image();
imagemFundo.src = 'fundoOceano.jpg';

let fundoCarregado = false;

imagemFundo.onload = () => {
    fundoCarregado = true;
};

imagemFundo.onerror = () => {
    console.warn('Erro ao carregar imagem de fundo');
};

export function gerarElementosEstaticos(canvas) {
    pedras = [];

    for (let i = 0; i < 50; i++) {
        pedras.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 40 + Math.random() * 20,
            raio: Math.random() * 3 + 1
        });
    }

    plantas = [];

    for (let i = 0; i < 15; i++) {
        plantas.push({
            x: Math.random() * canvas.width,
            y: canvas.height - 40
        });
    }
}

export function desenharFundo(ctx, canvas) {
    if (fundoCarregado && imagemFundo.complete) {
        ctx.drawImage(imagemFundo, 0, 0, canvas.width, canvas.height);
    } else {
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, '#1a6d8f');
        grad.addColorStop(1, '#0a3b4f');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

export function desenharFundoEstatico(ctx, canvas) {
    ctx.save();

    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = '#c2b280';
    ctx.fillRect(0, canvas.height - 40, canvas.width, 40);

    for (let p of pedras) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        ctx.fillStyle = '#8b5a2b';
        ctx.fill();
    }

    for (let planta of plantas) {
        ctx.beginPath();
        ctx.moveTo(planta.x, planta.y);
        ctx.quadraticCurveTo(planta.x - 10, planta.y - 30, planta.x, planta.y - 50);
        ctx.quadraticCurveTo(planta.x + 10, planta.y - 30, planta.x, planta.y);
        ctx.fillStyle = '#2e7d32';
        ctx.fill();
    }

    ctx.restore();
}