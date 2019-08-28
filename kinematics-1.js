window.onload = function() {
    let canvas = document.getElementById('canvas');
    let trail = document.getElementById('trail');
    let context = canvas.getContext('2d');
    let trailContext = trail.getContext('2d');
    let width = canvas.width = trail.width = window.innerWidth;
    let height = canvas.height = trail.height = window.innerHeight;

    let arm = Arm.of()
    arm.x = width / 2;
    arm.y = height / 2;
    arm.angle = 0.1;

    let angle = 0;

    let arm2 = Arm.of()
    arm2.x = arm.getEndX();
    arm2.y = arm.getEndY();
    arm2.angle = 1.3;

    let arm3 = Arm.of()
    arm3.x = arm2.getEndX();
    arm3.y = arm2.getEndY();
    arm3.angle = 1.3;

    arm2.parent = arm;
    arm3.parent = arm2;

    update();

    function update() {
        trailContext.beginPath()
        trailContext.moveTo(arm3.getEndX(), arm3.getEndY());

        context.clearRect(0, 0, width, height);
        arm.angle = Math.sin(angle) * 1.2;
        arm2.angle = Math.cos(angle * .873) * .92;
        arm3.angle = Math.cos(angle * 1.57) * 1.34;
        arm2.x = arm.getEndX();
        arm2.y = arm.getEndY();
        arm3.x = arm2.getEndX();
        arm3.y = arm2.getEndY();
        angle += 0.05;
        arm.render(context);
        arm2.render(context);
        arm3.render(context);

        trailContext.lineTo(arm3.getEndX(), arm3.getEndY());
        trailContext.stroke();

        requestAnimationFrame(update);
    }
}