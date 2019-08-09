window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let centerX = width / 2;
    let centerY = height / 2;
    let xRadius = 200;
    let yRadius = 400;
    let circles = (function() {
        let result = [];
        for (let i = 0; i < 50; i += 1) {
            result.push({
                xAngle: Math.random() * Math.PI * 2,
                yAngle: Math.random() * Math.PI * 2,
                xSpeed: Math.random() * 0.1,
                ySpeed: Math.random() * 0.1
            });
        }
        return result;
    })();

    render();

    function render() {
        context.clearRect(0, 0, width, height);
        for (let i = 0; i < circles.length; i += 1) {
            let { xAngle, yAngle, xSpeed, ySpeed } = circles[i];
            let x = centerX + Math.cos(xAngle) * xRadius;
            let y = centerY + Math.sin(yAngle) * yRadius;
            context.beginPath();
            context.arc(x, y, 10, 0, Math.PI * 2, false);
            context.fill();
    
            circles[i].xAngle += xSpeed;
            circles[i].yAngle += ySpeed;
        }
        requestAnimationFrame(render);
    }

}