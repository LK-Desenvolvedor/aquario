export function desenharOndulacao(ctx, canvas, tempo) {
    ctx.save();
    ctx.globalCompositeOperation = 'overlay';
    ctx.beginPath();

    for (let i = 0; i < canvas.width; i += 20) {
        let y = canvas.height * 0.1 + Math.sin(i * 0.02 + tempo.value * 2) * 5;
        ctx.moveTo(i, y);
        ctx.lineTo(i + 10, y + Math.sin(i * 0.02 + tempo.value * 2 + 1) * 3);
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

export function desenharReflexoSuperficie(ctx, canvas) {
    let grad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.3);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.3);
}