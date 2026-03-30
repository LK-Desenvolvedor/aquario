export function animar(callback) {
    function loop() {
        callback();
        requestAnimationFrame(loop);
    }
    loop();
}