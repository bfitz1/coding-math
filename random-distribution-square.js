window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let centerX = width / 2;
    let centerY = height / 2;

    for (let i = 0; i < 1000; i += 1) {
        let x = utils.randomRange(centerX - 100, centerX + 100);
        let y = utils.randomRange(centerY - 100, centerY + 100);

        context.beginPath();
        context.arc(x, y, 1, 0, Math.PI * 2, false);
        context.fill();
    }
}