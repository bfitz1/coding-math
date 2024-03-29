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
    let isShooting = false;
    let forceAngle = 0;
    let forceSpeed = 0.1;
    let rawForce = 0;
    let target = {};

    cannonball.radius = 7;

    setTarget();
    update();

    function setTarget() {
        target.x = utils.randomRange(200, width);
        target.y = height;
        target.radius = utils.randomRange(10, 40);
    }

    document.body.addEventListener('mousedown', onMouseDown);

    document.body.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
            case 32: // space
                if (!isShooting) { shoot(); }
                break;
            default:
                break;
        }
    });

    function shoot() {
        let force = utils.map(rawForce, -1, 1, 2, 20);
        cannonball.x = gun.x + Math.cos(gun.angle) * 40;
        cannonball.y = gun.y + Math.sin(gun.angle) * 40;
        cannonball.setSpeed(force);
        cannonball.setHeading(gun.angle);
        
        isShooting = true;
    }

    function update() {
        if (!isShooting) {
            forceAngle += forceSpeed;
            rawForce = Math.sin(forceAngle);
        }

        if (isShooting) {
            cannonball.update();
            checkTarget();
        }
        draw();

        if (cannonball.y > height) {
            isShooting = false;
        }
        requestAnimationFrame(update);
    }

    function checkTarget() {
        if (utils.circleCollision(target, cannonball)) {
            setTarget();
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
    }

    function draw() {
        context.clearRect(0, 0, width, height);

        context.fillStyle = "#ccc";
        context.fillRect(10, height - 10, 20, -100);

        context.fillStyle = "#666";
        context.fillRect(10, height - 10, 20, utils.map(rawForce, -1, 1, 0, -100));

        context.fillStyle = "#000";
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
            cannonball.x,
            cannonball.y,
            cannonball.radius,
            0, 2 * Math.PI, false);
        context.fill();

        context.fillStyle = "#f00";
        context.beginPath();
        context.arc(target.x, target.y, target.radius, 0, Math.PI * 2, false);
        context.fill();
    }
}