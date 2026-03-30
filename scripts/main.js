import { Peixe } from './entities/peixe.js';
import { Bolha } from './entities/bolha.js';

import {
    gerarElementosEstaticos,
    desenharFundo,
    desenharFundoEstatico
} from './effects/cenario.js';
import { criarRaios, desenharRaios } from './effects/luz.js';
import { desenharOndulacao, desenharReflexoSuperficie } from './effects/agua.js';

import { atualizarPeixes, atualizarBolhas } from './engine/physics.js';
import { animar } from './engine/loop.js';

const canvas = document.getElementById('aquarioCanvas');
const ctx = canvas.getContext('2d');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const audio = document.getElementById('somAmbiente');

let peixes = [];
let bolhas = [];
let raios = [];
let tempoRaios = { value: 0 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gerarElementosEstaticos(canvas);
    raios = criarRaios(canvas);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function criarPeixes(qtd) {
    peixes = [];
    for (let i = 0; i < qtd; i++) {
        peixes.push(new Peixe(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            `hsl(${Math.random() * 60 + 20}, 70%, 55%)`,
            20 + Math.random() * 15,
            canvas,
            ctx
        ));
    }
}

function criarBolhas(qtd) {
    bolhas = [];
    for (let i = 0; i < qtd; i++) {
        bolhas.push(new Bolha(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            3 + Math.random() * 8,
            0.5 + Math.random() * 2,
            canvas,
            ctx
        ));
    }
}

function frame() {
    if (!canvas || !ctx) return;
    desenharFundo(ctx, canvas);
    desenharRaios(ctx, canvas, raios, tempoRaios);
    desenharFundoEstatico(ctx, canvas);
    atualizarPeixes(peixes);
    atualizarBolhas(bolhas);
    peixes.forEach(p => p.desenhar());
    bolhas.forEach(b => b.desenhar());
    desenharReflexoSuperficie(ctx, canvas);
    desenharOndulacao(ctx, canvas, tempoRaios);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.textContent = 'Sair Tela Cheia';
    } else {
        document.exitFullscreen();
        fullscreenBtn.textContent = 'Tela Cheia';
    }
}

function iniciarSom() {
    if (audio.paused) {
        audio.play().catch(() => {});
    }
}

canvas.addEventListener('click', iniciarSom);
fullscreenBtn.addEventListener('click', () => {
    toggleFullscreen();
    iniciarSom();
});

gerarElementosEstaticos(canvas);
criarPeixes(8);
criarBolhas(40);
raios = criarRaios(canvas);

animar(frame);