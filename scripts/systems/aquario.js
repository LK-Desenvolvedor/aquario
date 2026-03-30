import { Peixe } from '../entities/peixe.js';
import { Bolha } from '../entities/bolha.js';

export function criarAquario(canvas, ctx) {
    let peixes = [];
    let bolhas = [];

    function init() {
        for (let i = 0; i < 8; i++) {
            peixes.push(new Peixe(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                'orange',
                20
            ));
        }

        for (let i = 0; i < 40; i++) {
            bolhas.push(new Bolha(
                Math.random() * canvas.width,
                Math.random() * canvas.height,
                5,
                1
            ));
        }
    }

    function update() {
        peixes.forEach(p => p.atualizar(canvas));
        bolhas.forEach(b => b.atualizar(canvas));
    }

    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        peixes.forEach(p => p.desenhar(ctx));
        bolhas.forEach(b => b.desenhar(ctx));
    }

    return { init, update, render };
}