window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let target = {
        x: width,
        y: Math.random() * height
    };
    let position = {
        x: 0,
        y: Math.random() * height
    };
    let ease = 0.1;
    let easing = true;

    document.body.addEventListener('mousemove', function(event) {
        target.x = event.clientX;
        target.y = event.clientY;
        if (!easing) {
            easing = true;
            update();
        }
    })

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(position.x, position.y, 10, 0, Math.PI * 2, false);
        context.fill();

        easing = easeTo(position, target, ease);

        if (easing) {
            requestAnimationFrame(update);
        }
    }

    function easeTo(position, target, ease) {
        let dx = target.x - position.x;
        let dy = target.y - position.y;

        position.x += dx * ease;
        position.y += dy * ease;

        if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
            position.x = target.x;
            position.y = target.y;
            return false;
        }
        return true;
    }
}