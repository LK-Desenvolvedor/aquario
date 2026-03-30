export class Bolha {
    constructor(x, y, raio, velocidade, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.raio = raio;
        this.velocidade = velocidade;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    atualizar() {
        this.y -= this.velocidade;
        if (this.y + this.raio < 0) {
            this.y = this.canvas.height + this.raio;
            this.x = Math.random() * this.canvas.width;
        }
    }

    desenhar() {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.stroke();
    }
}