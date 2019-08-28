window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();

    for (let i = 0; i < 100; i += 1) {
        let heads = Math.random() < 0.5;
        let y = Math.random() * height;
        let x = Math.random() * width / 2;

        if (heads) {
            x += width / 2;
        }
        context.beginPath();
        context.arc(x, y, 20, 0, Math.PI * 2, false);
        context.fill();
    }
}