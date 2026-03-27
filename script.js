        const canvas = document.getElementById('aquarioCanvas');
        const ctx = canvas.getContext('2d');
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const audio = document.getElementById('somAmbiente');

        let peixes = [];
        let bolhas = [];

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

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gerarElementosEstaticos();
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Peixe {
            constructor(x, y, vx, vy, cor, tamanho) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.cor = cor;
                this.tamanho = tamanho;
            }

            atualizar() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x - this.tamanho < 0) {
                    this.x = this.tamanho;
                    this.vx = -this.vx;
                }
                if (this.x + this.tamanho > canvas.width) {
                    this.x = canvas.width - this.tamanho;
                    this.vx = -this.vx;
                }
                if (this.y - this.tamanho < 0) {
                    this.y = this.tamanho;
                    this.vy = -this.vy;
                }
                if (this.y + this.tamanho > canvas.height) {
                    this.y = canvas.height - this.tamanho;
                    this.vy = -this.vy;
                }
            }

            desenhar() {
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
            }
        }

        class Bolha {
            constructor(x, y, raio, velocidade) {
                this.x = x;
                this.y = y;
                this.raio = raio;
                this.velocidade = velocidade;
            }

            atualizar() {
                this.y -= this.velocidade;
                if (this.y + this.raio < 0) {
                    this.y = canvas.height + this.raio;
                    this.x = Math.random() * canvas.width;
                }
            }

            desenhar() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.fill();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.stroke();
            }
        }

        function gerarElementosEstaticos() {
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

        function desenharFundoEstatico() {
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
        }

        function criarPeixes(qtd) {
            peixes = [];
            for (let i = 0; i < qtd; i++) {
                const tamanho = 20 + Math.random() * 15;
                const x = Math.random() * (canvas.width - 2 * tamanho) + tamanho;
                const y = Math.random() * (canvas.height - 2 * tamanho) + tamanho;
                const vx = (Math.random() - 0.5) * 2;
                const vy = (Math.random() - 0.5) * 2;
                const cor = `hsl(${Math.random() * 60 + 20}, 70%, 55%)`;
                peixes.push(new Peixe(x, y, vx, vy, cor, tamanho));
            }
        }

        function criarBolhas(qtd) {
            bolhas = [];
            for (let i = 0; i < qtd; i++) {
                const raio = 3 + Math.random() * 8;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const velocidade = 0.5 + Math.random() * 2;
                bolhas.push(new Bolha(x, y, raio, velocidade));
            }
        }

        function animar() {
            if (!canvas || !ctx) return;

            if (fundoCarregado && imagemFundo.complete) {
                ctx.drawImage(imagemFundo, 0, 0, canvas.width, canvas.height);
            } else {
                const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
                grad.addColorStop(0, '#1a6d8f');
                grad.addColorStop(1, '#0a3b4f');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            desenharFundoEstatico();

            peixes.forEach(peixe => {
                peixe.atualizar();
                peixe.desenhar();
            });

            bolhas.forEach(bolha => {
                bolha.atualizar();
                bolha.desenhar();
            });

            requestAnimationFrame(animar);
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
                audio.play().catch(e => {
                    console.log('Autoplay bloqueado, aguardando interação.');
                });
            }
        }

        canvas.addEventListener('click', () => {
            iniciarSom();
        });

        fullscreenBtn.addEventListener('click', () => {
            toggleFullscreen();
            iniciarSom();
        });

        document.addEventListener('fullscreenchange', () => {
            fullscreenBtn.textContent = document.fullscreenElement ? 'Sair Tela Cheia' : 'Tela Cheia';
        });

        gerarElementosEstaticos();
        criarPeixes(8);
        criarBolhas(40);
        animar();

        console.log('Aquário iniciado. Clique na tela para ativar o som.');