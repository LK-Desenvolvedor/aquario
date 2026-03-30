export class Peixe {
    constructor(x, y, vx, vy, cor, tamanho, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.cor = cor;
        this.tamanho = tamanho;
        this.canvas = canvas;
        this.ctx = ctx;
    }

    atualizar() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.tamanho < 0) {
            this.x = this.tamanho;
            this.vx = -this.vx;
        }
        if (this.x + this.tamanho > this.canvas.width) {
            this.x = this.canvas.width - this.tamanho;
            this.vx = -this.vx;
        }
        if (this.y - this.tamanho < 0) {
            this.y = this.tamanho;
            this.vy = -this.vy;
        }
        if (this.y + this.tamanho > this.canvas.height) {
            this.y = this.canvas.height - this.tamanho;
            this.vy = -this.vy;
        }
    }

    desenhar() {
        const ctx = this.ctx;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        ctx.save();
        ctx.translate(this.x, this.y);
        let angulo = Math.atan2(this.vy, this.vx);
        ctx.rotate(angulo);

        ctx.beginPath();
        ctx.ellipse(0, 0, this.tamanho, this.tamanho * 0.7, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.cor;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.tamanho * 0.4, -this.tamanho * 0.2, this.tamanho * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.arc(this.tamanho * 0.5, -this.tamanho * 0.2, this.tamanho * 0.07, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(-this.tamanho * 0.8, -this.tamanho * 0.3);
        ctx.lineTo(-this.tamanho * 1.2, 0);
        ctx.lineTo(-this.tamanho * 0.8, this.tamanho * 0.3);
        ctx.fillStyle = this.cor;
        ctx.fill();

        ctx.restore();

        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
    }
}