window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let gun = {
        x: 100,
        y: height,
        angle: -Math.PI / 4
    };
    let cannonball = Particle.fromParts(gun.x, gun.y, 15, gun.angle, 0.2);
    let canShoot = true;

    cannonball.radius = 7;

    draw();

    document.body.addEventListener('mousedown', onMouseDown);

    document.body.addEventListener('keyup', function(event) {
        switch(event.keyCode) {
            case 32: // space
                if (canShoot) { shoot(); }
                break;
            default:
                break;
        }
    });

    function shoot() {
        cannonball.position.x = gun.x + Math.cos(gun.angle) * 40;
        cannonball.position.y = gun.y + Math.sin(gun.angle) * 40;
        cannonball.velocity.setLength(15);
        cannonball.velocity.setAngle(gun.angle);

        canShoot = false;
        update();
    }

    function update() {
        cannonball.update();
        draw();

        if (cannonball.position.y > height) {
            canShoot = true;
        } else {
            requestAnimationFrame(update);
        }
    }

    function onMouseDown(event) {
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp);
        aimGun(event.clientX, event.clientY);
    }

    function onMouseMove(event) {
        aimGun(event.clientX, event.clientY);
    }

    function onMouseUp(event) {
        document.body.removeEventListener('mousemove', onMouseMove);
        document.body.removeEventListener('mouseup', onMouseUp);
        aimGun(event.clientX, event.clientY);
    }

    function aimGun(mouseX, mouseY) {
        gun.angle = utils.clamp(Math.atan2(mouseY - gun.y, mouseX - gun.x), -Math.PI / 2, -0.3);
        draw();
    }

    function draw() {
        context.clearRect(0, 0, width, height);

        context.beginPath();
        context.arc(gun.x, gun.y, 24, 0, 2 * Math.PI, false);
        context.fill();

        context.save();
        context.translate(gun.x, gun.y);
        context.rotate(gun.angle);
        context.fillRect(0, -8, 40, 16);
        context.restore();

        context.beginPath();
        context.arc(
            cannonball.position.x,
            cannonball.position.y,
            cannonball.radius,
            0, 2 * Math.PI, false);
        context.fill();
    }
}