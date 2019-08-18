window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let centerX = width / 2;
    let centerY = height / 2;
    let maxXRadius = 200;
    let maxYRadius = 100;


    for (let i = 0; i < 1000; i += 1) {
        let xRadius = utils.randomRange(0, maxXRadius);
        let yRadius = utils.randomRange(0, maxYRadius);
        let angle = utils.randomRange(0, Math.PI * 2);
        let x = centerX + Math.cos(angle) * xRadius;
        let y = centerY + Math.sin(angle) * yRadius;

        context.beginPath();
        context.arc(x, y, 1, 0, Math.PI * 2, false);
        context.fill();
    }
}