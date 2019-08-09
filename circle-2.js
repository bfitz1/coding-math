window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let centerX = width / 2;
    let centerY = height / 2;
    let radius = 200;
    let angle = 0;
    let numObjects = 20;
    let slice = Math.PI * 2 / numObjects;

    for (let i = 0; i < numObjects; i += 1) {
        let angle = i * slice;
        let x = centerX + Math.cos(angle) * radius;
        let y = centerY + Math.sin(angle) * radius;
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, false);
        context.fill();
    }


}