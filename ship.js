window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let ship = Particle.fromParts(width / 2, height / 2, 0, 0);
    let thrust = new Vector(0, 0);
    let angle = 0;
    let turningLeft = false;
    let turningRight = false;
    let thrusting = false;

    ship.friction = 0.99;

    update();

    document.body.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
            case 38: // up
                thrusting = true;
                break;
            case 37: // left
                turningLeft = true;
                break;
            case 39: // right
                turningRight = true;
                break;
            default:
                break;
        }
    });

    document.body.addEventListener('keyup', function(event) {
        switch(event.keyCode) {
            case 38: // up
                thrusting = false;
                break;
            case 37: // left
                turningLeft = false;
                break;
            case 39: // right
                turningRight = false;
                break;
            default:
                break;
        }
    });

    function update() {
        context.clearRect(0, 0, width, height);

        if (turningLeft) {
            angle -= 0.05;
        }
        if (turningRight) {
            angle += 0.05;
        }

        thrust.setAngle(angle);
        if (thrusting) {
            thrust.setLength(0.1);
        } else {
            thrust.setLength(0);
        }

        ship.accelerate(thrust);
        ship.update();

        context.save();
        context.translate(ship.position.x, ship.position.y);
        context.rotate(angle);

        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-10, -7);
        context.lineTo(-10, 7);
        context.lineTo(10, 0);
        if (thrusting) {
            context.moveTo(-10, 0);
            context.lineTo(-18, 0);
        }
        context.stroke();

        context.restore();

        if (ship.position.x > width) {
            ship.position.x = 0;
        }
        if (ship.position.x < 0) {
            ship.position.x = width;
        }
        if (ship.position.y > height) {
            ship.position.y = 0;
        }
        if (ship.position.y < 0) {
            ship.position.y = height;
        }

        requestAnimationFrame(update);
    }
}