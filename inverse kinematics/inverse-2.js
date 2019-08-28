window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = 0;
    let mouseY = 0;

    let iks1 = IKSystem.of(250, height);
    iks1.addArm(240);
    iks1.addArm(180);
    iks1.addArm(120);

    let iks2 = IKSystem.of(width - 250, height);
    iks2.addArm(240);
    iks2.addArm(180);
    iks2.addArm(120);

    let ball = {
        x: 100, y: 100,
        vx: 5, vy: 0,
        radius: 20,
        gravity: 0.25,
        bounce: -1,

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            
            if (this.x + this.radius > width) {
                this.x = width - this.radius;
                this.vx *= this.bounce;
            } else if (this.x < this.radius) {
                this.x = this.radius;
                this.vx *= this.bounce;
            }

            if (this.y + this.radius > height) {
                this.y = height - this.radius;
                this.vy *= this.bounce;
            } else if (this.y < this.radius) {
                this.y = this.radius;
                this.vy *= this.bounce;
            }
        },

        render(context) {
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            context.fill();
        }
    }

    // document.body.addEventListener('mousemove', function(event) {
    //     mouseX = event.clientX;
    //     mouseY = event.clientY;
    // });

    update()

    function update() {
        context.clearRect(0, 0, width, height);

        ball.update();
        ball.render(context);

        iks1.reach(ball.x, ball.y);
        iks2.reach(ball.x, ball.y);

        iks1.render(context);
        iks2.render(context);

        requestAnimationFrame(update);
    }
}