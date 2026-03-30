export function criarRaios(canvas) {
    let raios = [];
    const numRaios = 5;

    for (let i = 0; i < numRaios; i++) {
        raios.push({
            x: Math.random() * canvas.width,
            largura: 50 + Math.random() * 100,
            intensidade: 0.3 + Math.random() * 0.4,
            velocidade: 0.5 + Math.random() * 1,
            offset: Math.random() * Math.PI * 2
        });
    }

    return raios;
}

export function desenharRaios(ctx, canvas, raios, tempoRaiosRef) {
    tempoRaiosRef.value += 0.005;

    for (let raio of raios) {
        let x = raio.x + Math.sin(tempoRaiosRef.value * raio.velocidade + raio.offset) * 30;

        let grad = ctx.createLinearGradient(x - raio.largura / 2, 0, x + raio.largura / 2, 0);
        grad.addColorStop(0, 'rgba(255, 255, 200, 0)');
        grad.addColorStop(0.5, `rgba(255, 240, 180, ${raio.intensidade * 0.4})`);
        grad.addColorStop(1, 'rgba(255, 255, 200, 0)');

        ctx.globalAlpha = 0.6;
        ctx.fillStyle = grad;
        ctx.fillRect(x - raio.largura / 2, 0, raio.largura, canvas.height);
    }

    ctx.globalAlpha = 1;
}